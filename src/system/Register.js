import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
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

import style from "./views/RegisterPage/RegisterPageRoot.module.css";
import NavBar from "./views/RegisterPage/NavBar/NavBar.js";
import Title from "./views/RegisterPage/Title/Title.js";
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
    zIndex: 0,
  },
}));

export default function Register(props) {
  const navigateRoute = useNavigate();
  const classes = useStyles();

  // Form state
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    sex: "",
    birthdate: "mm/dd/yyyy",
    phone: "+62",
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
      [event.target.name]: event.target.value,
    }));
  }
  function handleCloseLoadingAlert(event) {
    setFormState({ ...formState, loading: false });
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

  // HANDLE: empty form error
  const [snackBarEmptyError, setSnackBarEmptyError] = React.useState({
    open: false,
    message: "",
  });
  function handleOpenErrorSnackBar() {
    setSnackBarEmptyError((prevState) => ({
      ...prevState,
      open: true,
    }));
  }
  function handleCloseErrorSnackBar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarEmptyError((prevState) => ({
      ...prevState,
      open: false,
    }));
  }

  // METHOD: register button
  function registerButton(event) {
    event.preventDefault();
    const payloadData = {
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      name: formState.name,
      sex: formState.sex,
      birthdate: formState.birthdate,
      phone: formState.phone,
      city: formState.city,
      address: formState.address,
    };

    // check for empty form
    if (payloadData.email === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Email tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.password === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Password tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.confirmPassword === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Konfirmasi password tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.confirmPassword !== payloadData.password) {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Password & Konfirmasi password tidak sesuai",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.name === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Nama tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.sex === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Anda belum memilih jenis kelamin",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.birthdate === "mm/dd/yyyy") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Tanggal lahir tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.phone === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "No. Whatsapp / HP tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.city === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Kota / Kabupaten tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }
    if (payloadData.address === "") {
      setSnackBarEmptyError((prevState) => ({
        ...prevState,
        open: true,
        message: "Alamat tidak boleh kosong",
      }));
      handleOpenErrorSnackBar();
      return;
    }

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

    // set loading TRUE
    setFormState({ ...formState, loading: !formState.loading });

    // POST request encodedPayloadData to "/signup" route  
    axios
      .post("/signup", encodedPayloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log(result.data);
        setFormState({ ...formState, loading: !formState.loading });
        navigateRoute("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err)
        // close loading alert
        setFormState((prevState) => ({
          ...prevState,
          errors: err.response,
          loading: false,
        }));
        // open error alert
        setSnackBarEmptyError((prevState) => ({
          ...prevState,
          open: true,
          message: "Koneksi ke server gagal",
        }));
        handleOpenErrorSnackBar();
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
                <MenuItem id="sex" value={"Male"}>
                  Pria
                </MenuItem>
                <MenuItem id="sex" value={"Female"}>
                  Wanita
                </MenuItem>
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
                defaultValue={"+62"}
                helperText={"gunakan format nomor hp dengan kode negara +62"}
              />
            </FormControl>
          </div>
          <button className={style.buttonRegister} onClick={registerButton}>
            daftar
          </button>
          {/* ERROR Snackbar */}
          <Snackbar
            open={snackBarEmptyError.open}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            key={"bottomcenter"}
            autoHideDuration={6000}
            onClose={handleCloseErrorSnackBar}
            message="I love it"
          >
            <Alert onClose={handleCloseErrorSnackBar} severity="error">
              {snackBarEmptyError.message}
            </Alert>
          </Snackbar>
          {/* LOADING Snackbar */}
          <Snackbar
            open={formState.loading}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
    </>
  );
}
