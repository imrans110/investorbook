import React from "react";
import { Header, Image, Table, Dropdown } from "semantic-ui-react";
import styled from "styled-components";

import {
  TableContainer,
  TableCell,
  HeaderContent,
  StyledParagraph,
  StyledIconArrow,
} from "../../styles/common";
import { getNumberLocale } from "../../utils/helper";
import { PAGINATION_DEFAULT_OPTIONS } from "../../utils/constants";

const DataTable = ({
  headerCells,
  data: { data, totalCount },
  paginate,
  setPaginate,
}) => {
  const handleNextPage = () => {
    setPaginate({ ...paginate, offset: paginate.offset + paginate.limit });
  };

  const handlePrevPage = () => {
    setPaginate({
      ...paginate,
      offset:
        paginate.offset < paginate.limit
          ? paginate.offset
          : paginate.offset - paginate.limit,
    });
  };

  const handlePerPage = (ev, data) => {
    console.log({ data });
  };

  return (
    <TableContainer>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            {headerCells.map((headerCell) => (
              <Table.HeaderCell key={headerCell}>
                <StyledParagraph fontSize="12px">{headerCell}</StyledParagraph>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <TableCell collapsing>
                <Header as="h4" image>
                  {item.thumbnail ? (
                    <Image src={item.thumbnail} circular size="mini" />
                  ) : null}
                  <HeaderContent>{item.name}</HeaderContent>
                </Header>
              </TableCell>
              <Table.Cell>
                <StyledParagraph>
                  {item.elementData.map((el, idx) =>
                    idx === item.elementData.length - 1 ? el + ". " : el + ", "
                  )}
                </StyledParagraph>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <DropdownContainer>
                <StyledSpan> Rows per page: </StyledSpan>
                <StyledDropdown
                  options={PAGINATION_DEFAULT_OPTIONS}
                  inline
                  defaultValue="6"
                  onClick={handlePerPage}
                />
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <StyledSpan>
                  {getNumberLocale(paginate.offset + 1)} -
                  {getNumberLocale(paginate.offset + paginate.limit)}
                  &nbsp; of &nbsp;
                  {getNumberLocale(totalCount)}
                </StyledSpan>
                &nbsp;&nbsp;&nbsp;
                <StyledIconArrow
                  disabled={false}
                  onClick={handlePrevPage}
                  name="chevron left"
                />
                &nbsp;
                <StyledIconArrow
                  disabled={false}
                  onClick={handleNextPage}
                  name="chevron right"
                />
              </DropdownContainer>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

const DropdownContainer = styled.div`
  float: right !important;
`;

const StyledDropdown = styled(Dropdown)`
  & i {
    font-family: Icons !important;
    font-weight: 500 !important;
  }

  & div {
    font-weight: 500 !important;
  }
`;

const StyledSpan = styled.span`
  font-weight: 500 !important;
`;
