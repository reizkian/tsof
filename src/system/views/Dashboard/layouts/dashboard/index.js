import React from "react";

import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalData } from "system/redux/reducer/auth";

import { styled } from "@mui/material/styles";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

import { jwtEncodeUtil, jwtDecodeUtil } from "system/util/jwt";
import account from "../../_mocks_/account";
import axios from "axios";

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
  const [open, setOpen] = React.useState(false);
  const [isReset, setIsReset] = React.useState(false);
  // const { firebaseAuth } = useSelector((state) => state.auth);
  let { personalData } = useSelector((state) => state.auth);


  // 1. MOUNT: User Account Data
  // 1.1 set dashboard layout component state

  // const { state } = useLocation();
  // const dispatch = useDispatch();

  // 1.2 get encodedUserCredential
  // if (account.displayName === "undefined") {
  //   let encodedUserCredential;
  //   let decodedUserCredential;
  //   try {
  //     encodedUserCredential = state.encodedUserCredential;
  //     decodedUserCredential = jwt.verify(encodedUserCredential, process.env.REACT_APP_JWT_KEY, {
  //       algorithm: "HS256",
  //     });
  //   } catch (err) {
  //     encodedUserCredential = localStorage.getItem("firebaseUserCredential");
  //     decodedUserCredential = jwt.verify(encodedUserCredential, process.env.REACT_APP_JWT_KEY, {
  //       algorithm: "HS256",
  //     });
  //   }
  //   // 1.3 add imageURL for personalData
  //   const personalData = decodedUserCredential.personalData;
  //   personalData.displayName = personalData.name.split(" ")[0] + " " + personalData.name.split(" ")[1];
  //   personalData.sex === "Male"
  //     ? (personalData.imageURL = "https://drive.google.com/uc?export=view&id=1E9DNjv8-mE3BRWBUAkEzjdNcXWByEp3q")
  //     : (personalData.imageURL = "https://drive.google.com/uc?export=view&id=1erFZ5Baw88bFvllF1af8JNR-AMD1bpi5");
  //   setAccount(personalData);
  //   dispatch(setFirebaseAuth(encodedUserCredential));
  //   dispatch(setPersonalData(personalData));
  // }

  return (
    <RootStyle>
      <DashboardNavbar account={personalData} onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        account={personalData}
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet account={personalData} />
      </MainStyle>
    </RootStyle>
  );
}
