import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";

import { styled } from "@mui/material/styles";

import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

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
  const [open, setOpen] = useState(false);

  // MOUNT: User Account Data
  const [account, setAccount] = useState({
    displayName: "undefined",
    email: "undefined@email.com",
    role: "undefined role",
    photoURL: "https://drive.google.com/uc?export=view&id=1E9DNjv8-mE3BRWBUAkEzjdNcXWByEp3q",
  });
  const { state } = useLocation();
  if (account.displayName === "undefined") {
    const encodedUserCredential = state.encodedUserCredential;
    const decodedUserCredential = jwt.verify(encodedUserCredential, process.env.REACT_APP_JWT_KEY, {
      algorithm: "HS256",
    });
    const personalData = decodedUserCredential.personalData;
    personalData.displayName = personalData.name.split(" ")[0] + " " + personalData.name.split(" ")[1];
    personalData.sex === "Male"
      ? (personalData.photoURL = "https://drive.google.com/uc?export=view&id=1E9DNjv8-mE3BRWBUAkEzjdNcXWByEp3q")
      : (personalData.photoURL = "https://drive.google.com/uc?export=view&id=1erFZ5Baw88bFvllF1af8JNR-AMD1bpi5");
    setAccount(personalData)
    }

  return (
    <RootStyle>
      <DashboardNavbar account={account} onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar account={account} isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
