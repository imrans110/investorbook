import React from "react";
import { Tab } from "semantic-ui-react";
import styled from "styled-components";

import AppShell from "../../components/AppShell";
import Investors from "../../components/Investors";
import Companies from "../../components/Companies";

const panes = [
  {
    menuItem: "Investors",
    render: () => (
      <TabPane attached={false}>
        <Investors />
      </TabPane>
    ),
  },
  {
    menuItem: "Companies",
    render: () => (
      <TabPane attached={false}>
        <Companies />
      </TabPane>
    ),
  },
];

const Dashboard = () => {
  return (
    <AppShell>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </AppShell>
  );
};

export default Dashboard;

const TabPane = styled(Tab.Pane)`
  min-height: 300px !important;
`;
