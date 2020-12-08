import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import "./App.css";

import Dashboard from "./views/Dashboard";
import theme from "../src/utils/theme";
import InvestorDetails from "./views/InvestorDetails";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar
        autoClose={5000}
        Maintenance
        closeOnClick
      />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/investors/:id" component={InvestorDetails} />
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
