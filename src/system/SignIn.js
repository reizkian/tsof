import React from "react";
import style from "components/SignInPage/SignInPageRoot.module.css";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import jwt from "jsonwebtoken";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setFirebaseAuth } from "system/redux/reducer/auth";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
  // REDUX: variable
  const dispatch = useDispatch();

  const classes = useStyles();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
    errors: {},
  });
  // HANDLE: form state
  function handleFormChange(event) {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  // HANDLE: show password
  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // METHOD: sign in
  function signInButton() {
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

    // secretOrPrivateKey located in .env file
    const encodedPayloadData = {
      token: jwt.sign(payloadData, process.env.REACT_APP_JWT_KEY, { algorithm: "HS256" }),
    };
    // POST request encodedPayloadData to "/signup" route
    axios
      .post("/signin", encodedPayloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        // ~ console log encrypted firebase user credentials
        console.log(result.data);
        const decodedFirebaseUserCredential = jwt.verify(result.data.token, process.env.REACT_APP_JWT_KEY, {
          algorithms: "HS256",
        });
        dispatch(setFirebaseAuth(decodedFirebaseUserCredential))
      })
      .then(()=>{props.history.push("/dashboard")})
  }

  return (
    <>
      <div className={style.containerFluid}>
        <div className={style.contentSignIn}>
          <div className={style.SignInImgContainer}>
            <img
              className={style.SignInImg}
              width="445"
              height="455"
              src={require("assets/img/signin.png").default}
              alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
            />
          </div>
          <div className={style.SignInFormContainer}>
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
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <TextField
                  id="outlined-basic"
                  name="email"
                  onChange={handleFormChange}
                  label="Email"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        {formState.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <div>
                <button className={style.buttonSignIn} onClick={signInButton}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <ul className={style.ul}>
            <li className={style.docsNav}>
              <a className={style.docsLink} href="/" target="_blank" rel="noopener noreferrer">
                Konseling
              </a>
            </li>
            <li className={style.docsNav}>
              <a className={style.docsLink} href="/" target="_blank" rel="noopener noreferrer">
                Kelas Pengajaran
              </a>
            </li>
            <li className={style.docsNav}>
              <a className={style.docsLink} href="/" target="_blank" rel="noopener noreferrer">
                Pertumbuhan Rohani
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
