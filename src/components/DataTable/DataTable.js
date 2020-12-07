import React from "react";
import { Header, Image, Table, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import {
  TableContainer,
  TableCell,
  HeaderContent,
  StyledParagraph,
  StyledIcon,
  TableRow,
} from "../../styles/common";
import { getNumberLocale } from "../../utils/helper";
import { PAGINATION_DEFAULT_OPTIONS } from "../../utils/constants";

const DataTable = ({
  headerCells,
  data: { data, totalCount },
  paginate,
  setPaginate,
  tableType,
}) => {
  const history = useHistory();

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
    setPaginate((prevState) => ({ ...prevState, limit: data.value }));
  };

  const handleCellClick = (id) => () => {
    if (tableType === "INVESTORS") {
      history.push(`/investors/${id}`);
    }
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
            <TableRow
              tableType={tableType}
              onClick={handleCellClick(item.id)}
              key={item.id}
            >
              <TableCell collapsing>
                <Header as="h4" image>
                  {item.thumbnail ? (
                    <Image src={item.thumbnail} circular size="large" />
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
            </TableRow>
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
                  defaultValue={paginate.limit}
                  onChange={handlePerPage}
                />
                <StyledSpan>
                  {getNumberLocale(paginate.offset + 1)} -
                  {getNumberLocale(paginate.offset + paginate.limit)} of{" "}
                  {getNumberLocale(totalCount)}
                </StyledSpan>
                <StyledIcon
                  disabled={paginate.offset === 0}
                  onClick={handlePrevPage}
                  name="chevron left"
                />
                &nbsp;
                <StyledIcon
                  disabled={paginate.offset + paginate.limit >= totalCount}
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
  margin-left: 10px;
  margin-right: 10px;
`;
