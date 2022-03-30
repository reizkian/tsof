import React from "react";
import style from "./views/SignInPage/SignInPageRoot.module.css";

import { useDispatch } from "react-redux";
import { setFirebaseAuth, setPersonalData } from "system/redux/reducer/auth";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";

import axios from "axios";
import clsx from "clsx";
import { jwtEncodeUtil, jwtDecodeUtil } from "system/util/jwt";

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
    width: "40ch",
    height: "10ch",
  },
}));

export default function SignIn(props) {
  const dispatch = useDispatch();
  const navigateRoute = useNavigate();

  // REACT HOOK STATE
  
  const classes = useStyles();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
    errors: {},
  });

  // framer motion const
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };

  // HANDLE: form state
  function handleFormChange(event) {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  function handleCloseLoadingAlert(event) {
    setFormState({ ...formState, loading: false });
  }

  // HANDLE: show password
  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // HANDLE: error notification
  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);
  function handleOpenErrorSnackBar() {
    setOpenErrorSnackBar(true);
  }
  
  function handleCloseErrorSnackBar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackBar(false);
  }

  // METHOD: sign in
  function signInButton(event) {
    event.preventDefault();
    const payloadData = {
      email: formState.email,
      password: formState.password,
    };

    /*
      ~ npm jsonwebtoken
      documentation:
        https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
      usage: 
        jwt.sign(payload, secretOrPrivateKey, [options, callback])
        jwt.verify(token, secretOrPublicKey, [options, callback])
    */

    // encode payload data before send to server
    const encodedPayloadData = {
      token: jwtEncodeUtil(payloadData)
    };

    // set loading TRUE
    setFormState({ ...formState, loading: !formState.loading });

    // POST request encodedPayloadData to "/signup" route
    axios
      .post("/signin", encodedPayloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {

        // set local storage variable
        localStorage.setItem("firebaseUserCredential", `${result.data.token}`);
        localStorage.setItem("authenticationStatus", true);
        const decodedUserCredential = jwtDecodeUtil(result.data.token);
        const encodedPersonalData = jwtEncodeUtil(decodedUserCredential.personalData)
        localStorage.setItem("personalData", encodedPersonalData)

        // set redux state
        dispatch(setFirebaseAuth(decodedUserCredential));
        dispatch(setPersonalData(decodedUserCredential.personalData));

        return result.data.token;
      })
      .then((firebaseUserCredential) => {
        navigateRoute("/dashboard", {
          state: { encodedUserCredential: firebaseUserCredential },
          replace: true,
        });
      })
      .catch((err) => {
        // close loading alert
        setFormState((prevState) => ({
          ...prevState,
          errors: err.response.data,
          loading: false,
        }));
        // open error alert
        if (err) {
          handleOpenErrorSnackBar();
        }
      });
  }

  return (
    <>
      <div className={style.containerFluid}>
        <div className={style.contentSignIn}>
          <div className={style.SignInImgContainer}>
            <motion.img
              className={style.SignInImg}
              initial={{ opacity: 0, y: -70 }}
              animate={animateTo}
              transition={{ delay: 0.05 }}
              width="600"
              height="610"
              src={require("assets/img/signin.png").default}
              alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
            />
          </div>
          <div className={style.SignInFormContainer}>
            <form onSubmit={signInButton}>
              <div className={style.brandContainer}>
                <img
                  className={style.brandImage}
                  width="70"
                  height="75"
                  src={require("assets/img/logo_sof.png").default}
                  alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
                />
                <h1 className={style.brandText}>The School of Fire</h1>
              </div>
              <div className={style.form}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <TextField
                    id="outlined-basic"
                    name="email"
                    onChange={handleFormChange}
                    label="Email"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    type={formState.showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleFormChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {formState.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
                <div>
                  <button type="submit" className={style.buttonSignIn}>
                    Sign In
                  </button>
                  {/* WARNING Snackbar */}
                  <Snackbar
                    open={openErrorSnackBar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    key={"topcenter"}
                    autoHideDuration={6000}
                    onClose={handleCloseErrorSnackBar}
                    message="I love it"
                  >
                    <Alert onClose={handleCloseErrorSnackBar} severity="error">
                      {formState.errors.message}
                    </Alert>
                  </Snackbar>
                  {/* LOADING Snackbar */}
                  <Snackbar
                    open={formState.loading}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    key={"bottomcenter"}
                    autoHideDuration={20000}
                    onClose={handleCloseErrorSnackBar}
                    message="I love it"
                  >
                    <Alert onClose={handleCloseLoadingAlert} severity="success">
                      {"Mohon tunggu koneksi server"}
                    </Alert>
                  </Snackbar>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={style.footer}>
          <ul className={style.ul}>
            <motion.li
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.05 }}
              className={style.docsNav}
            >
              <a
                className={style.docsLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Konseling
              </a>
            </motion.li>
            <motion.li
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.15 }}
              className={style.docsNav}
            >
              <a
                className={style.docsLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kelas Pengajaran
              </a>
            </motion.li>
            <motion.li
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.25 }}
              className={style.docsNav}
            >
              <a
                className={style.docsLink}
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pertumbuhan Rohani
              </a>
            </motion.li>
            <motion.li
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.35 }}
              className={style.docsNav}
            >
              <a className={style.docsLink} href="/" rel="noopener noreferrer">
                Home
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
    </>
  );
}