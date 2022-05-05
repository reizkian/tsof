import React from "react";
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Snackbar,
  Alert,
  Button,
  Link,
  LinearProgress,
  Typography,
} from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";
import pallete from "system/views/Dashboard/theme/palette";
import DaftarKelas from "./DaftarKelas";

export default function Beranda() {
  const navigateRoute = useNavigate();
  const [account, setAccount] = useOutletContext();
  const [firstName, setFirstName] = React.useState();
  const [openSnackbarInfo, setOpenSnackbarInfo] = React.useState(false);
  const [classes, setClasses] = React.useState();
  const [group, setGroup] = React.useState();

  React.useEffect(() => {
    getActiveClassesAPI();
    getGroupListAPI();
    if (account.name) {
      setFirstName(account.name.split(" ")[0]);
      if (account.classID === undefined) {
        setOpenSnackbarInfo(true);
      }
    }
  }, [account]);

  function handleCloseSnackBar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbarInfo(false);
  }

  function getActiveClassesAPI() {
    axios
      .get("class/get-active-class-list", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        setClasses(respond.data);
      });
  }

  function getGroupListAPI() {
    axios
      .get("group/get-group-list", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        setGroup(respond.data);
      });
  }

  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <PageTitle>Welcome to The School of Fire!</PageTitle>
        </Box>
        {classes ? (
          <>
            <DaftarKelas classes={classes} group={group} account={account} />
            <Box sx={{ ml: 4, display: "inline-flex" }}>
              <Typography variant="body2" color={pallete.grey[500]}>
                donasi untuk pengembangan website
              </Typography>
              <Link
                sx={{ ml: 0.5 }}
                variant="body2"
                underline="none"
                onClick={()=>{navigateRoute("/dashboard/donate")}}
              >
                klik disini
              </Link>
            </Box>
          </>
        ) : (
          <LinearProgress />
        )}
      </Container>
      {/* REMINDER Snackbar */}
      <Snackbar
        open={openSnackbarInfo}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={"topcenter"}
        autoHideDuration={20000}
        onClose={handleCloseSnackBar}
        message="I love it"
      >
        <Alert onClose={handleCloseSnackBar} severity="info">
          Hallo {firstName}, anda belum terdaftar sebagai <b> Murid </b> atau{" "}
          <b> Pembina </b> pada salah satu kelas. Ayo segera daftar! &#128522;
        </Alert>
      </Snackbar>
    </Page>
  );
}
