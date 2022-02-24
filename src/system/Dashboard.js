import React from "react";

import ThemeConfig from "./views/Dashboard/theme";
import Router from "./views/Dashboard/DashboardRoutes";

export default function Dashboard(props) {
  return (
    <ThemeConfig>
      <Router />
    </ThemeConfig>
  );
}
