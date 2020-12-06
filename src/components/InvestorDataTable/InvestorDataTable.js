import React from "react";
import { Header, Table } from "semantic-ui-react";
import styled from "styled-components";

import {
  TableContainer,
  StyledIcon,
  ActionContainer,
  StyledParagraph,
} from "../../styles/common";

import { getNumberLocale } from "../../utils/helper";

const InvestorDataTable = ({ data }) => (
  <TableContainer>
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <StyledParagraph>Name </StyledParagraph>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <StyledParagraph>Amount</StyledParagraph>
          </Table.HeaderCell>
          <Table.HeaderCell textAlign="right">
            <StyledParagraph>Actions</StyledParagraph>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item) => (
          <Table.Row key={item.companyId}>
            <Table.Cell width={4}>
              <Header as="h4">
                <TableHeading>{item.companyName}</TableHeading>
              </Header>
            </Table.Cell>
            <Table.Cell width={4}>${getNumberLocale(item.amount)}</Table.Cell>
            <Table.Cell width={8}>
              <StyledActionContainer>
                <StyledIcon name="pencil alternate" />
                <StyledIcon name="trash alternate" />
              </StyledActionContainer>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </TableContainer>
);

export default InvestorDataTable;

const StyledActionContainer = styled(ActionContainer)`
  justify-content: flex-end !important;

  & > * {
    margin-left: 20px !important;
  }
`;

const TableHeading = styled.div`
  margin-right: 10px;
  font-weight: 500 !important;
`;
