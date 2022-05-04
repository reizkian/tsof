import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalData } from "system/redux/reducer/auth";
import { setUnReadNotifications } from "system/redux/reducer/notifications";

import { styled } from "@mui/material/styles";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import { jwtDecodeUtil } from "system/util/jwt";

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
  const userID = jwtDecodeUtil(localStorage.getItem("personalData"))._id;

  const [open, setOpen] = React.useState(false);
  const [isRefreshed, setIsRefreshed] = React.useState(false);
  const { personalData } = useSelector((state) => state.auth);
  const [account, setAccount] = React.useState(personalData);

  React.useEffect(() => {
    getUnReadNotifications();
    if (personalData._id === undefined) {
      getUserPersonalData();
    }
    if (isRefreshed) {
      setAccount(personalData);
    }
  }, [personalData, isRefreshed]);

  function getUserPersonalData() {
    // * GET DATA FROM LOCAL STORAGE
    // console.log("get data from local storage")
    // const personalData = jwtDecodeUtil(localStorage.getItem("personalData"));
    // dispatch(setPersonalData(personalData));
    // setAccount(personalData);
    // setIsRefreshed(true);

    axios
      .get(`user/${userID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        const personalData = jwtDecodeUtil(respond.data.token);
        dispatch(setPersonalData(personalData));
        setAccount(personalData);
        setIsRefreshed(true);
      })
      .catch((err) => {
        console.log(err.respond.data);
      });
  }

  function getUnReadNotifications() {
    axios
      .get(`notifications/unread/${userID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        // set notification redux state
        console.log("dispatch notifications")
        dispatch(setUnReadNotifications(respond.data.notifications));
      })
      .catch((error) => {
        console.error(error);
      });
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
        <Outlet context={[account, setAccount]} />
      </MainStyle>
    </RootStyle>
  );
}
