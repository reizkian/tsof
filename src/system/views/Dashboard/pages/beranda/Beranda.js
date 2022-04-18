import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

import DaftarKelas from "./DaftarKelas";

export default function Beranda() {
  const [account, setAccount] = useOutletContext();
  const [firstName, setFirstName] = React.useState()
  const [openSnackbarInfo, setOpenSnackbarInfo] = React.useState(false);

  React.useEffect(() => {
    if (account.name) {
      setFirstName(account.name.split(" ")[0])
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

  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <PageTitle>Welcome to The School of Fire!</PageTitle>
        </Box>
        <DaftarKelas />
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
          Hallo {firstName}, anda belum terdaftar sebagai <b> Murid </b> atau <b> Pembina </b> pada salah satu kelas. Ayo segera daftar! &#128522;
        </Alert>
      </Snackbar>
    </Page>
  );
}
