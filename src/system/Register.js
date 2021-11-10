import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import jwt from "jsonwebtoken";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import style from "components/RegisterPage/RegisterPageRoot.module.css";
import NavBar from "components/RegisterPage/NavBar/NavBar.js";
import Title from "components/RegisterPage/Title/Title.js";

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
    zIndex: 0,
  },
}));

export default function Register() {
  const classes = useStyles();

  // Form state
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    sex: "",
    birthdate: "mm/dd/yyyy",
    phone: "",
    city: "",
    address: "",
    loading: false,
    showPassword: false,
    showConfirmPassword: false,
    errors: {},
  });
  // HANDLE: form state
  function handleFormChange(event) {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }
  // HANDLE: show password & confirm password
  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };
  const handleClickShowConfirmPassword = () => {
    setFormState({ ...formState, showConfirmPassword: !formState.showConfirmPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  // METHOD: register button
  function registerButton() {
    const payloadData = {
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      name: formState.name,
      birthdate: formState.birthDate,
      phone: formState.phone,
      city: formState.city,
      address: formState.address,
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
      token: jwt.sign(
        payloadData, 
        process.env.REACT_APP_JWT_KEY, 
        { algorithm: "HS256" }) 
    };

    // POST request encodedPayloadData to "/signup" route 
    axios
      .post("/signup", encodedPayloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log(result.data);
      });
  }
  return (
    <>
      {/* H E A D E R */}
      <div className={style.containerFluid}>
        <NavBar />
        <Title />
        <div class={style.dividerContainer}>
          <img
            className={style.divider}
            src={require("assets/img/divider.png").default}
            alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
          />
        </div>

        {/* FORM CONTAINER */}
        <div className={style.formContainer}>
          {/* INPUT: email */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField name="email" onChange={handleFormChange} id="email" label="Email" variant="outlined" />
            </FormControl>
          </div>

          {/* INPUT: password */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                name="password"
                id="password"
                type={formState.showPassword ? "text" : "password"}
                value={formState.password}
                onChange={handleFormChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      name="showPassword"
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
          </div>
          {/* INPUT: confirm passowrd */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Konfirmasi Password</InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                label="Konfirmasi Password"
                type={formState.showConfirmPassword ? "text" : "password"}
                value={formState.confirmPassword}
                onChange={handleFormChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {formState.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </div>
          <h2 className={style.formSectionTitle}>Data Pribadi</h2>
          {/* INPUT: name */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField id="name" name="name" onChange={handleFormChange} label="Nama Lengkap" variant="outlined" />
            </FormControl>
          </div>
          {/* INPUT: sex */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel id="demo-simple-select-label">Jenis Kelamin</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="sex"
                name="sex"
                label="Jenis Kelamin"
                onChange={handleFormChange}
              >
                <MenuItem value={"Male"}>Pria</MenuItem>
                <MenuItem value={"Female"}>Wanita</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* INPUT: birth date */}
          <div className={style.formElemet}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns} inputVariant="outlined">
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="dd/mm/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </LocalizationProvider> */}
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="birthdate"
                name="birthdate"
                variant="outlined"
                label="Tanggal Lahir (Bulan / Tanggal / Tahun)"
                type="date"
                defaultValue="yyy-MM-dd"
                onChange={handleFormChange}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </div>
          {/* INPUT: city */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="city"
                name="city"
                onChange={handleFormChange}
                label="Kota / Kabupaten"
                variant="outlined"
              />
            </FormControl>
          </div>
          {/* INPUT: address */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="address"
                name="address"
                onChange={handleFormChange}
                label="Alamat Domisili"
                variant="outlined"
              />
            </FormControl>
          </div>
          {/* INPUT: phone */}
          <div className={style.formElemet}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="phone"
                name="phone"
                onChange={handleFormChange}
                label="No. Whatsapp / HP"
                variant="outlined"
              />
            </FormControl>
          </div>
          <button className={style.buttonRegister} onClick={registerButton}>
            daftar
          </button>
        </div>
      </div>
    </>
  );
}
