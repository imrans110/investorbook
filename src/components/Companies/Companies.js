import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import DataTable from "../DataTable";
import {
  PrimaryButton,
  ActionContainer,
  StyledHeader,
  SearchIcon,
  HeaderContainer,
  StyledTabContentContainer,
} from "../../styles/common";
import Loader from "../Shared/Loader";
import { GET_Companies } from "../../queries/companies";
import { normalizeCompanies } from "../../utils/normalizeQueryResponse";

const CompaniesShell = ({ children }) => {
  return (
    <StyledTabContentContainer>
      <HeaderContainer>
        <ActionContainer>
          <StyledHeader>Companies</StyledHeader>
          <PrimaryButton inverted>Add Company</PrimaryButton>
        </ActionContainer>
        <SearchIcon name="search" />
      </HeaderContainer>
      {children}
    </StyledTabContentContainer>
  );
};

const Companies = () => {
  const [paginate, setPaginate] = useState({
    offset: 0,
    limit: 6,
    totalCount: null,
  });

  const { data, loading, error } = useQuery(GET_Companies, {
    variables: {
      offset: paginate.offset,
      limit: paginate.limit,
    },
  });

  if (loading) {
    return (
      <CompaniesShell>
        <Loader />
      </CompaniesShell>
    );
  }

  if (error) {
    return (
      <CompaniesShell>
        Error fetching Companies. Please try again
      </CompaniesShell>
    );
  }

  if (data.company.length === 0) {
    return <CompaniesShell>No Companies found</CompaniesShell>;
  }

  return (
    <CompaniesShell>
      <DataTable
        data={normalizeCompanies(data)}
        headerCells={["NAME", "INVESTORS"]}
        paginate={paginate}
        setPaginate={setPaginate}
      />
    </CompaniesShell>
  );
};

export default Companies;
