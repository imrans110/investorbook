import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Input } from "semantic-ui-react";

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

const CompaniesShell = ({ children, query, onSearchInputChange }) => {
  return (
    <StyledTabContentContainer>
      <HeaderContainer>
        <ActionContainer>
          <StyledHeader>Companies</StyledHeader>
          <PrimaryButton inverted>Add Company</PrimaryButton>
        </ActionContainer>
        <Input icon placeholder="Search Companies">
          <input value={query} onChange={onSearchInputChange} />
          <SearchIcon name="search" />
        </Input>
      </HeaderContainer>
      {children}
    </StyledTabContentContainer>
  );
};

const Companies = () => {
  const [query, setQuery] = useState("");

  const [paginate, setPaginate] = useState({
    offset: 0,
    limit: 6,
    totalCount: null,
  });

  const gquery = { offset: paginate.offset, limit: paginate.limit };

  if (query?.length) {
    gquery.where = {
      name: { _like: query },
    };
  }

  const { data, loading, error } = useQuery(GET_Companies, {
    variables: gquery,
  });

  const onSearchInputChange = (e) => {
    setPaginate({
      offset: 0,
      limit: 6,
      totalCount: null,
    });
    setQuery(e.target.value);
  };

  return (
    <CompaniesShell query={query} onSearchInputChange={onSearchInputChange}>
      {(() => {
        if (loading) {
          return (
            <div>
              <Loader />
            </div>
          );
        }

        if (error) {
          return <div>Error fetching Companies. Please try again</div>;
        }

        if (data.company.length === 0) {
          return <div>No Companies found</div>;
        }

        return (
          <DataTable
            data={normalizeCompanies(data)}
            headerCells={["NAME", "INVESTORS"]}
            paginate={paginate}
            setPaginate={setPaginate}
          />
        );
      })()}
    </CompaniesShell>
  );
};

export default Companies;
