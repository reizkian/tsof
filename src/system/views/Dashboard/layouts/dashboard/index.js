import React from "react";

import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPersonalData,
  refreshPersonalData,
} from "system/redux/reducer/auth";

import { styled } from "@mui/material/styles";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import { jwtEncodeUtil, jwtDecodeUtil } from "system/util/jwt";
import account from "../../_mocks_/account";
import axios from "axios";
import { is } from "date-fns/locale";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function DashboardLayout(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [isRefreshed, setIsRefreshed] = React.useState(false);
  const { personalData } = useSelector((state) => state.auth);
  const [account, setAccount] = React.useState(personalData);

  React.useEffect(() => {
    if (personalData._id === undefined) {
      getUserPersonalData();
    }
  }, []);

  function getUserPersonalData() {
    const personalData = jwtDecodeUtil(localStorage.getItem("personalData"));
    dispatch(setPersonalData(personalData));
    setAccount(personalData);
    setIsRefreshed(false);
  }

  return (
    <RootStyle>
      <DashboardNavbar account={account} onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        account={account}
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet account={account} />
      </MainStyle>
    </RootStyle>
  );
}
