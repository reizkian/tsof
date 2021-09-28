import React, { Component } from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


import {global} from "assets/theme.js"
import LandingPage from "blog/LandingPage.js";
import SignIn from "system/SignIn.js"
import Register from "system/Register.js"

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
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </Router>
          </BrowserRouter>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
