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
import { GET_INVESTORS } from "../../queries/investors";
import { normalizeInvestors } from "../../utils/normalizeQueryResponse";
import AddInvestorModal from "../AddInvestorModal";

const InvestorsShell = ({ children, query, onSearchInputChange }) => {
  const [investorModalOpen, setInvestorModalOpen] = useState(false);

  return (
    <StyledTabContentContainer>
      <HeaderContainer>
        <ActionContainer>
          <StyledHeader>Investors</StyledHeader>
          <AddInvestorModal
            open={investorModalOpen}
            setOpen={setInvestorModalOpen}
            trigger={<PrimaryButton inverted>Add Investor</PrimaryButton>}
          />
        </ActionContainer>
        <Input icon placeholder="Search Investors">
          <input value={query} onChange={onSearchInputChange} />
          <SearchIcon name="search" />
        </Input>
      </HeaderContainer>
      {children}
    </StyledTabContentContainer>
  );
};

const Investors = () => {
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

  const { data, loading, error } = useQuery(GET_INVESTORS, {
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
    <InvestorsShell query={query} onSearchInputChange={onSearchInputChange}>
      {(() => {
        if (loading) {
          return (
            <div>
              <Loader />
            </div>
          );
        }

        if (error) {
          return <div> Error fetching Investors. Please try again </div>;
        }

        if (data.investor.length === 0) {
          return <div>No Investors found</div>;
        }
        return (
          <DataTable
            data={normalizeInvestors(data)}
            headerCells={["NAME", "INVESTMENTS"]}
            paginate={paginate}
            setPaginate={setPaginate}
            tableType="INVESTORS"
          />
        );
      })()}
    </InvestorsShell>
  );
};

export default Investors;
