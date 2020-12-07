import styled from "styled-components";
import { Button, Icon, Container, Table, Header } from "semantic-ui-react";

import { omitProps } from "../utils/helper";

export const PrimaryButton = styled(Button)`
  color: ${(props) => props.theme.primary} !important;
  font-weight: normal !important;
  &&& {
    box-shadow: 0 0 0 1.4px ${(props) => props.theme.primary} inset !important;
  }

  button:focus {
    box-shadow: 0 0 0 1.4px ${(props) => props.theme.primary} inset !important;
    color: black;
  }

  &:hover {
    background-color: ${(props) => props.theme.primary} !important;
    color: white !important;
  }
`;

export const StyledHeader = styled.div`
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    margin-right: 18px;
  }
`;

export const SearchIcon = styled(Icon)`
  font-family: Icons !important;
  float: right;
  cursor: pointer;
`;

export const StyledIcon = styled(Icon)`
  font-family: Icons !important;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableContainer = styled(Container)`
  margin-top: 27px;
  width: 100% !important;
`;

export const TableCell = styled(omitProps(Table.Cell, ["tableType"]))`
  width: 25% !important;
`;

export const HeaderContent = styled(Header.Content)`
  font-weight: 500 !important;
`;

export const StyledParagraph = styled.p`
  color: ${(props) => props.theme.text} !important;
  font-weight: 500 !important;
  font-size: ${(props) => props.fontSize || "12px"};
`;

export const StyledContainer = styled(Container)`
  &&& {
    margin: 35px 42px !important;
    width: 100% !important;
    min-width: 100% !important;
  }
`;

export const StyledTabContentContainer = styled(Container)`
  width: 100% !important;
`;

export const TableRow = styled(omitProps(Table.Row, ["tableType"]))`
  cursor: ${(props) =>
    props.tableType === "INVESTORS" ? "pointer" : "default"};

  &: hover {
    background-color: rgb(0 0 255 / 4%);
  }
`;
