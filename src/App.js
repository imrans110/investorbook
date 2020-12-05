import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./App.css";

import Dashboard from "./views/Dashboard";
import theme from "../src/utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
