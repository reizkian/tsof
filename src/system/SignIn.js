import React from "react";
import style from "components/SignInPage/SignInPageRoot.module.css";
import axios from "axios";
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

  function signInButton() {
    console.log("clicked signin button")
    axios
      .get("http://180.243.47.250:3030/usercount", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("execute sign in buton");
      });
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
