import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { Image, Header, Grid } from "semantic-ui-react";

import AppShell from "../../components/AppShell";
import { StyledIcon } from "../../styles/common";
import Loader from "../../components/Shared/Loader";
import { getNumberLocale } from "../../utils/helper";
import InvestorDataTable from "../../components/InvestorDataTable";
import AddInvestmentModal from "../../components/AddInvestmentModal";

import { GET_INVESTOR } from "../../queries/investors";
import { normalizeInvestorDetails } from "../../utils/normalizeQueryResponse";

const InvestorDetails = ({ match, history }) => {
  const [investmentModalOpen, setInvestmentModalOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_INVESTOR, {
    variables: {
      id: Number(match.params.id),
    },
  });

  if (loading) {
    return (
      <AppShell>
        <Loader />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>Error fetching Investor Details. Please try again</AppShell>
    );
  }

  if (data.investor_by_pk.length === 0) {
    return <AppShell>No Investor found</AppShell>;
  }

  const goBack = () => {
    history.goBack();
  };

  return (
    <AppShell>
      <StyledGrid>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} computer={2}>
            <UserAction>
              <StyledIcon onClick={goBack} name="angle left" size="big" />
              <Image
                src={data.investor_by_pk.photo_large}
                circular
                size="large"
              />
            </UserAction>
          </Grid.Column>
          <Grid.Column mobile={16} computer={14}>
            <HeaderContainer>
              <div>
                <StyledHeader as="h2">{data.investor_by_pk.name}</StyledHeader>
                <Header.Subheader style={{ marginTop: "0px" }}>
                  Total Amount Invested: $
                  {getNumberLocale(
                    data.investor_by_pk.investments_aggregate.aggregate.sum
                      .amount
                  )}
                </Header.Subheader>
              </div>
              <ActionsContainer>
                <div>
                  <StyledIcon name="pencil" />
                  Edit Name
                </div>
                <div>
                  <StyledIcon name="trash alternate" />
                  Remove Investor
                </div>
              </ActionsContainer>
            </HeaderContainer>
            <TableHeader>
              <TableHeading>Investments</TableHeading>
              <AddInvestmentModal
                investor_id={data.investor_by_pk.id}
                open={investmentModalOpen}
                setOpen={setInvestmentModalOpen}
                trigger={
                  <AddInvestmentBtn> + Add Investments</AddInvestmentBtn>
                }
              />
            </TableHeader>
            <div>
              <InvestorDataTable data={normalizeInvestorDetails(data)} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </StyledGrid>
    </AppShell>
  );
};

export default InvestorDetails;

const flexStyle = css`
  display: flex;
  align-items: center;
`;

const StyledGrid = styled(Grid)`
  margin-top: 30px !important;
`;

const UserAction = styled.div`
  ${flexStyle};
`;

const HeaderContainer = styled.div`
  ${flexStyle};
  justify-content: space-between;
  margin-bottom: 25px;
`;

const StyledHeader = styled(Header)`
  font-weight: 500 !important;
  margin-bottom: 10px !important;
`;

const ActionsContainer = styled.div`
  ${flexStyle};
  justify-content: flex-end;

  & > * {
    margin-left: 20px;
  }
`;

const AddInvestmentBtn = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.secondary};

  &: hover {
    color: ${(props) => props.theme.secondaryHover};
  }
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
`;

const TableHeading = styled.div`
  margin-right: 10px;
`;
