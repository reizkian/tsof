import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

import "assets/styleSignIn.css";

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
    width: "45ch",
    height: "10ch",
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div class="container-fluid-signin">
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} justify="center">
            <div class="illustration">
              <img
                class="brand-image"
                width="445"
                height="455"
                src={require("assets/img/signin.png").default}
                alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} justify="center">
            <div class="form-container">
              <div class="brand-container">
                <img
                  class="brand-image"
                  width="70"
                  height="75"
                  src={require("assets/img/logo_sof.png").default}
                  alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
                />
                <h1 class="brand-text">The School of Fire</h1>
              </div>
              <div class="form">
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <TextField id="outlined-basic" label="Email" variant="outlined" />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </div>
              <div class="text-center">
                <Button class="button-signin">Sign In</Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <div class="footer text-center">
          <ul >
            <li class="nav">
              <a
                class="docs-link"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konseling
              </a>
            </li >
            <li class="nav">
              <a class="docs-link" href="/" target="_blank" rel="noopener noreferrer">
                
              </a>
            </li>
            <li class="nav">
              <a class="docs-link" href="/" target="_blank" rel="noopener noreferrer">
                Kelas Pengajaran
              </a>
            </li>
            <li class="nav">
              <a class="docs-link" href="/" target="_blank" rel="noopener noreferrer">
                Pertumbuhan Rohani
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
