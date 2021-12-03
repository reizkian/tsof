import React, { Component } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

import { global } from "assets/theme.js";
import LandingPage from "blog/LandingPage.js";
import SignIn from "system/SignIn.js";
import Register from "system/Register.js";
import Dashboard from "system/dashboard/Dashboard.js";
import { SignInRoute, AuthenticatedRoute } from "system/util/ProtectedRoute.js";
import { authenticatedSession } from "system/util/session.js";

axios.defaults.baseURL = "http://localhost:5001/the-school-of-fire/us-central1/app";
// axios.defaults.baseURL = "https://us-central1-the-school-of-fire.cloudfunctions.net/app";

const themeGlobal = createMuiTheme(global);

// * R O U T E * //
class App extends Component {
  render() {
    return (
      <>
        <MuiThemeProvider theme={themeGlobal}>
          <BrowserRouter>
            <Router>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <SignInRoute exact path="/sign-in" component={SignIn} authenticated={authenticatedSession()}/>
                <Route exact path="/register" component={Register} />
                <AuthenticatedRoute exact path="/dashboard" component={Dashboard} authenticated={authenticatedSession()}/>
              </Switch>
            </Router>
          </BrowserRouter>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
