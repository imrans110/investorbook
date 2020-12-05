import React from "react";
import { Container, Header } from "semantic-ui-react";
import styled from "styled-components";

const AppShell = ({ children }) => {
  return (
    <StyledContainer>
      <Header as="h1">
        <StyledHeader>I N V E S T O R</StyledHeader> B O O K
      </Header>
      {children}
    </StyledContainer>
  );
};

export default AppShell;

const StyledContainer = styled(Container)`
  &&& {
    margin: 35px 42px !important;
    width: auto !important;
  }
`;

const StyledHeader = styled.span`
  color: ${(props) => props.theme.logo};
`;
