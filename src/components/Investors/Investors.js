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
import { GET_INVESTORS } from "../../queries/investors";
import { normalizeInvestors } from "../../utils/normalizeQueryResponse";

const InvestorsShell = ({ children }) => {
  return (
    <StyledTabContentContainer>
      <HeaderContainer>
        <ActionContainer>
          <StyledHeader>Investors</StyledHeader>
          <PrimaryButton inverted>Add Investor</PrimaryButton>
        </ActionContainer>
        <SearchIcon name="search" />
      </HeaderContainer>
      {children}
    </StyledTabContentContainer>
  );
};

const Investors = () => {
  const [paginate, setPaginate] = useState({
    offset: 0,
    limit: 6,
    totalCount: null,
  });

  const { data, loading, error } = useQuery(GET_INVESTORS, {
    variables: {
      offset: paginate.offset,
      limit: paginate.limit,
    },
  });

  if (loading) {
    return (
      <InvestorsShell>
        <Loader />
      </InvestorsShell>
    );
  }

  if (error) {
    return (
      <InvestorsShell>
        Error fetching Investors. Please try again
      </InvestorsShell>
    );
  }

  if (data.investor.length === 0) {
    return <InvestorsShell>No Investors found</InvestorsShell>;
  }

  return (
    <InvestorsShell>
      <DataTable
        data={normalizeInvestors(data)}
        headerCells={["NAME", "INVESTMENTS"]}
        paginate={paginate}
        setPaginate={setPaginate}
        tableType="INVESTORS"
      />
    </InvestorsShell>
  );
};

export default Investors;
