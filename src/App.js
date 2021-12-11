import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from "axios";

import { global } from "assets/theme.js";
import LandingPage from "blog/LandingPage.js";
import SignIn from "system/SignIn.js";
import Register from "system/Register.js";
import Dashboard from "system/Dashboard.js";

import ThemeConfig from "system/views/Dashboard/theme";
import DashboardRoutes from "system/views/Dashboard/DahsboardRoutes";
import GlobalStyles from "system/views/Dashboard/theme/globalStyles";
import ScrollToTop from "system/views/Dashboard/components/ScrollToTop";
import { BaseOptionChartStyle } from 'system/views/Dashboard/components/charts/BaseOptionChart';

import { SignInRoute, AuthenticatedRoute } from "system/util/ProtectedRoute.js";
import { authenticatedSession } from "system/util/session.js";

axios.defaults.baseURL = "http://localhost:5001/the-school-of-fire/us-central1/app";
// axios.defaults.baseURL = "https://us-central1-the-school-of-fire.cloudfunctions.net/app";

const themeGlobal = createMuiTheme(global);

// * R O U T E * //
class App extends Component {
  render() {
    return (
      <HelmetProvider>
        {/* custome theme for specific routes */}
        <MuiThemeProvider theme={themeGlobal}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/sign-in" element={<SignIn />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </MuiThemeProvider>
        {/* minimal-react theme for system dasboard routes */}
        <ThemeConfig>
          <BrowserRouter>
            <ScrollToTop />
            <BaseOptionChartStyle />
            <DashboardRoutes />
          </BrowserRouter>
        </ThemeConfig>
      </HelmetProvider>
    );
  }
}

export default App;
