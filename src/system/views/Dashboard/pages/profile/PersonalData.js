import React from "react";
import axios from "axios";
import clsx from "clsx";

import { useDispatch } from "react-redux";
import { setPersonalData } from "system/redux/reducer/auth";

import { Box, Button, Card, Grid, Snackbar, Alert } from "@mui/material";
import { makeStyles, FormControl, TextField } from "@material-ui/core";

import { jwtEncodeUtil } from "system/util/jwt";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(0),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "100%",
    height: "10ch",
    paddingLeft: "15px",
    paddingRight: "15px",
    zIndex: 0,
  },
}));

export default function PersonalData({ personalData }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // STATE: user personal data
  const [profileState, setprofileState] = React.useState(personalData);

  // STATE: error
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);

  // STATE: success
  const [successMessage, setSuccessMessage] = React.useState("");
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);

  // STATE: save button disabled
  const [saveButtonDisabled, setSaveButtonDisabled] = React.useState(false);

  function handleFormChange(event) {
    setprofileState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  // FUNCTION: update user personal data at Firebase Database
  function updateUserPersonalData() {
    // disabled save button
    setSaveButtonDisabled(true);
    // encode updated user personal data at profileState
    const encodedPayloadData = { token: jwtEncodeUtil(profileState) };
    axios
      .post(`user/${profileState._id}`, encodedPayloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        // set redux new personalData
        dispatch(setPersonalData(profileState));
        // set local storage
        localStorage.setItem("personalData", jwtEncodeUtil(profileState));

        setSuccessMessage(respond.data.message);
        handleOpenSuccessSnackBar();
        setSaveButtonDisabled(false);
        return respond.data.message;
      })
      .catch((err) => {
        console.log(err.respond);
        setErrorMessage(err.respond.data.message);
        handleOpenErrorSnackBar();
        setSaveButtonDisabled(false);
      });
  }

  // FUNCTION: success snack bar
  function handleOpenSuccessSnackBar() {
    setOpenSuccessSnackBar(true);
  }
  function handleCloseSuccessSnackBar(reason) {
    setOpenSuccessSnackBar(false);
  }

  // FUNCTION: error nack bar
  function handleOpenErrorSnackBar() {
    setOpenErrorSnackBar(true);
  }
  function handleCloseErrorSnackBar(reason) {
    setOpenErrorSnackBar(false);
  }

  return (
    <>
      <Card>
        <Box
          sx={{
            p: "3%",
            mt: "3%",
            mx: "auto",
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          <Grid container>
            {/* INPUT: name */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  id="name"
                  name="name"
                  value={profileState.name}
                  onChange={handleFormChange}
                  label="Nama Lengkap"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* INPUT: email */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  name="email"
                  value={profileState.email}
                  onChange={handleFormChange}
                  id="email"
                  label="Email"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* INPUT: birth date */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  name="birthdate"
                  value={profileState.birthdate}
                  onChange={handleFormChange}
                  id="birthdate"
                  label="Tanggal Lahir"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* INPUT: phone*/}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  name="phone"
                  value={profileState.phone}
                  onChange={handleFormChange}
                  id="phone"
                  label="No Whatsapp / HP"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* INPUT: city*/}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  name="city"
                  value={profileState.province}
                  onChange={handleFormChange}
                  id="city"
                  label="Provinsi"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* INPUT: city*/}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  name="city"
                  value={profileState.city}
                  onChange={handleFormChange}
                  id="city"
                  label="Kota / Kabupaten"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            {/* INPUT: address*/}
            <Grid item xs={12} md={12} lg={12}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  name="address"
                  value={profileState.address}
                  onChange={handleFormChange}
                  id="address"
                  label="Alamat"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ paddingBottom: "5px" }}>
                <Button
                  to="/dashboard/home"
                  onClick={updateUserPersonalData}
                  disabled={saveButtonDisabled}
                >
                  Simpan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* ERROR Snackbar */}
      <Snackbar
        open={openErrorSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackBar}
      >
        <Alert onClose={handleCloseErrorSnackBar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* SUCCESS Snackbar */}
      <Snackbar
        open={openSuccessSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackBar}
      >
        <Alert onClose={handleCloseSuccessSnackBar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
