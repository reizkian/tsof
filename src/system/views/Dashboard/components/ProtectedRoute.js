import React from "react";
import { checkAccessLevel } from "system/util/authorization";

import Page401 from "system/views/Dashboard/pages/Page401";

export default function ProtectedRoute({ level, children }) {
  const accessLevel = checkAccessLevel();
  
  let isAuthorized = null;
  switch (level) {
    case 0:
      isAuthorized = accessLevel.level0;
      break;
    case 1:
      isAuthorized = accessLevel.level1;
      break;
    case 2:
      isAuthorized = accessLevel.level2;
      break;
    case 3:
      isAuthorized = accessLevel.level3;
      break;
  }

  if (isAuthorized) {
    return children;
  } else {
    return <Page401/>;
  }
}
