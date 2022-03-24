import React from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import { makeStyles, FormControl, TextField } from "@material-ui/core";

import clsx from "clsx";

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
  const classes = useStyles();
  
  const [profileState, setprofileState] = React.useState(personalData);
  function handleFormChange(event) {
    setprofileState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
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

            {/* INPUT: sex */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <TextField
                  name="sex"
                  value={profileState.sex === "Male" ? "Pria" : "Wanita"}
                  onChange={handleFormChange}
                  disabled
                  id="sex"
                  label="Gender"
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

            {/* INPUT: address*/}
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ paddingBottom: "30px" }}>
                <Button to="/dashboard/home" size="large" variant="contained">
                  simpan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}
