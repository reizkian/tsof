import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
  FormLabel,
  Radio,
  RadioGroup,
  Divider,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";

import pallete from "system/views/Dashboard/theme/palette";
import { eydMonth } from "system/util/time";
import { toBoolean } from "system/util/string";

const REGISTRATION_FORM_PROPERTIES = {
  mk: {
    colorBase: "secondary",
    colorTitle: pallete.secondary.main,
    colorMenuItem: pallete.grey[800],
    colorMenuItemHover: pallete.secondary.main,
    title: "Murid Kristus",
  },
  pk: {
    colorBase: "warning",
    colorTitle: pallete.warning.main,
    colorMenuItem: pallete.grey[800],
    colorMenuItemHover: pallete.warning.main,
    title: "Pekerja Kristus",
  },
  hk: {
    colorBase: "primary",
    colorTitle: pallete.primary.main,
    colorMenuItem: pallete.grey[800],
    colorMenuItemHover: pallete.primary.main,
    title: "Hamba Kristus",
  },
};

export default function DaftarKelas({ classes, group, account }) {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };

  // Component: state
  // -----------------------------------------------------------------------
  const [propClasses, setPropClasses] = React.useState(classes);
  const [openRegistrationDialog, setOpenRegistrationDialog] = React.useState(
    false
  );
  const [formProperties, setFormProperties] = React.useState({});
  const [classProperties, setClassProperties] = React.useState({});
  const [formState, setFormState] = React.useState({
    classID: "",
    role: "",
    group: "",
    isMarried: "",
  });
  const [formStateError, setFormStateError] = React.useState({
    role: false,
    group: false,
    isMarried: false,
  });
  const [isUploading, setIsUploading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);

  // Component: function
  // -----------------------------------------------------------------------
  function handleOpenRegistrationDialog() {
    setOpenRegistrationDialog(true);
  }
  function handleCloseRegristrationDialog() {
    setFormState({ role: "", group: "", isMarried: "" });
    setFormStateError({ role: false, group: false, isMarried: false });
    setOpenRegistrationDialog(false);
  }
  function handleChangeRole(event) {
    setFormState((prevState) => ({ ...prevState, role: event.target.value }));
  }
  function handleChangeGroup(event) {
    const selectedOption = group.activeGroup.filter((data) => {
      return data.nameShort === event.target.value;
    })[0];

    setFormState((prevState) => ({ ...prevState, group: selectedOption._id }));
  }
  function handleRadioMarried(event) {
    setFormState((prevState) => ({
      ...prevState,
      isMarried: toBoolean(event.target.value),
    }));
  }
  function handleRegistrationButton() {
    setIsUploading(true);
    checkEmptyForm();
    registerClassAPI();
    setIsUploading(false);
  }
  function handleOpenSuccessSnackBar() {
    setOpenSuccessSnackBar(true);
  }
  function handleCloseSuccessSnackBar(reason) {
    setOpenSuccessSnackBar(false);
  }

  function handleOpenErrorSnackBar() {
    setOpenErrorSnackBar(true);
  }
  function handleCloseErrorSnackBar(reason) {
    setOpenErrorSnackBar(false);
  }

  // API call
  // -----------------------------------------------------------------------
  function registerClassAPI() {
    if (formState.role === "") {
      setFormStateError((prevState) => ({
        ...prevState,
        role: true,
      }));
      return;
    }
    if (formState.group === "") {
      setFormStateError((prevState) => ({
        ...prevState,
        group: true,
      }));
      return;
    }
    if (formState.isMarried === "") {
      setFormStateError((prevState) => ({
        ...prevState,
        isMarried: true,
      }));
      return;
    }

    let payloadData = formState;
    // payloadData.classID = {
    //   student: payloadData.role === "Murid" ? classProperties._id : null,
    //   counselor: payloadData.role === "Pembina" ? classProperties._id : null,
    // };

    payloadData.classID =
      payloadData.role === "Murid"
        ? { student: classProperties._id }
        : { counselor: classProperties._id };

    axios
      .post(`/class/register/${account._id}`, payloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          handleCloseRegristrationDialog();
          setIsUploading(false);
          setSuccessMessage(
            "Pendaftaran kelas berhasil! Jangan lupa untuk update foto profil ya "
          );
          handleOpenSuccessSnackBar();
        }
      })
      .catch((error) => {
        handleCloseRegristrationDialog();
        setIsUploading(false);
        setErrorMessage("Internal Server Error, Mohon coba kembali");
        handleOpenErrorSnackBar();
      });
  }

  function checkEmptyForm() {
    if (formState.role === "") {
      setFormStateError((prevState) => ({
        ...prevState,
        role: true,
      }));
      return;
    } else {
      setFormStateError((prevState) => ({
        ...prevState,
        role: false,
      }));
    }
    if (formState.group === "") {
      setFormStateError((prevState) => ({
        ...prevState,
        group: true,
      }));
      return;
    } else {
      setFormStateError((prevState) => ({
        ...prevState,
        group: false,
      }));
    }
    if (formState.isMarried === "") {
      setFormStateError((prevState) => ({
        ...prevState,
        isMarried: true,
      }));
      return;
    } else {
      setFormStateError((prevState) => ({
        ...prevState,
        isMarried: false,
      }));
    }
  }

  // React Effect
  // -----------------------------------------------------------------------
  React.useEffect(() => {}, [formState]);

  const cardMuridKristus = (
    <Card>
      <CardActionArea
        onClick={() => {
          setFormProperties(REGISTRATION_FORM_PROPERTIES.mk);
          handleOpenRegistrationDialog();

          const selectedActiveClass = propClasses.activeClasses.filter(
            (data) => {
              return data.courseID === "tsof0";
            }
          )[0];
          // convert to Indonesian EYD date
          selectedActiveClass.eyd = `${
            selectedActiveClass.startDate.split("-")[0]
          } ${eydMonth[`${selectedActiveClass.startDate.split("-")[1]}`]} ${
            selectedActiveClass.startDate.split("@")[0].split("-")[2]
          }`;

          setClassProperties(selectedActiveClass);
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={require("assets/img/final-mk-2.png").default}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Murid Kristus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelas ini mengajarkan dasar-dasar Iman ke-kristenan yang mencakup
            Keselamatan, Yesus sebagai Tuhan, Baptis Air, Baptis Roh Kudus, Saat
            Teduh, dan Tertanam di Gereja Lokal.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            setFormProperties(REGISTRATION_FORM_PROPERTIES.mk);
            handleOpenRegistrationDialog();

            const selectedActiveClass = propClasses.activeClasses.filter(
              (data) => {
                return data.courseID === "tsof0";
              }
            )[0];
            // convert to Indonesian EYD date
            selectedActiveClass.eyd = `${
              selectedActiveClass.startDate.split("-")[0]
            } ${eydMonth[`${selectedActiveClass.startDate.split("-")[1]}`]} ${
              selectedActiveClass.startDate.split("@")[0].split("-")[2]
            }`;

            setClassProperties(selectedActiveClass);
          }}
          sx={{
            color: "#9D26CA",
            "&:hover": {
              backgroundColor: "#F5DCFF",
            },
          }}
        >
          Daftar
        </Button>
      </CardActions>
    </Card>
  );

  const cardPekerjaKristus = (
    <Card>
      <CardActionArea
        onClick={() => {
          setFormProperties(REGISTRATION_FORM_PROPERTIES.pk);
          handleOpenRegistrationDialog();

          const selectedActiveClass = propClasses.activeClasses.filter(
            (data) => {
              return data.courseID === "tsof1";
            }
          )[0];
          // convert to Indonesian EYD date
          selectedActiveClass.eyd = `${
            selectedActiveClass.startDate.split("-")[0]
          } ${eydMonth[`${selectedActiveClass.startDate.split("-")[1]}`]} ${
            selectedActiveClass.startDate.split("@")[0].split("-")[2]
          }`;

          setClassProperties(selectedActiveClass);
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={require("assets/img/final-pk.png").default}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pekerja Kristus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelas ini mengajarkan nilai-nilai ke-Kristenan dalam kehidupan
            sehari-hari mencakup Kuasa Doa, Kuasa Komunitas Sel, Menginjil dan
            Bersaksi, Pergaulan Pria dan Wanita, Keuangan yang Merdeka,
            Kepemimpinan Rohani.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            setFormProperties(REGISTRATION_FORM_PROPERTIES.pk);
            handleOpenRegistrationDialog();

            const selectedActiveClass = propClasses.activeClasses.filter(
              (data) => {
                return data.courseID === "tsof1";
              }
            )[0];
            // convert to Indonesian EYD date
            selectedActiveClass.eyd = `${
              selectedActiveClass.startDate.split("-")[0]
            } ${eydMonth[`${selectedActiveClass.startDate.split("-")[1]}`]} ${
              selectedActiveClass.startDate.split("@")[0].split("-")[2]
            }`;

            setClassProperties(selectedActiveClass);
          }}
          sx={{
            color: "#FFA500",
            "&:hover": {
              backgroundColor: "#FFEDCB",
            },
          }}
        >
          Daftar
        </Button>
      </CardActions>
    </Card>
  );

  const cardHambaKristus = (
    <Card>
      <CardActionArea
        onClick={() => {
          setFormProperties(REGISTRATION_FORM_PROPERTIES.hk);
          handleOpenRegistrationDialog();

          const selectedActiveClass = propClasses.activeClasses.filter(
            (data) => {
              return data.courseID === "tsof2";
            }
          )[0];
          // convert to Indonesian EYD date
          selectedActiveClass.eyd = `${
            selectedActiveClass.startDate.split("-")[0]
          } ${eydMonth[`${selectedActiveClass.startDate.split("-")[1]}`]} ${
            selectedActiveClass.startDate.split("@")[0].split("-")[2]
          }`;

          setClassProperties(selectedActiveClass);
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={require("assets/img/final-hk.png").default}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hamba Kristus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelas Hamba Kristus menolong anda untuk menemukan Alasan utama
            melayani, Panggilan hidup dan Kehendak Tuhan.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => {
            setFormProperties(REGISTRATION_FORM_PROPERTIES.hk);
            handleOpenRegistrationDialog();

            const selectedActiveClass = propClasses.activeClasses.filter(
              (data) => {
                return data.courseID === "tsof2";
              }
            )[0];
            // convert to Indonesian EYD date
            selectedActiveClass.eyd = `${
              selectedActiveClass.startDate.split("-")[0]
            } ${eydMonth[`${selectedActiveClass.startDate.split("-")[1]}`]} ${
              selectedActiveClass.startDate.split("@")[0].split("-")[2]
            }`;

            setClassProperties(selectedActiveClass);
          }}
          color="primary"
        >
          Daftar
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ pb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={animateFrom}
                animate={animateTo}
                transition={{ delay: 0.25 }}
              >
                {cardMuridKristus}
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={animateFrom}
                animate={animateTo}
                transition={{ delay: 0.35 }}
              >
                {cardPekerjaKristus}
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <motion.div
                initial={animateFrom}
                animate={animateTo}
                transition={{ delay: 0.45 }}
              >
                {cardHambaKristus}
              </motion.div>
            </Grid>
          </Grid>
        </Box>
        <Dialog
          open={openRegistrationDialog}
          onClose={handleCloseRegristrationDialog}
        >
          <DialogTitle color={formProperties.colorTitle}>
            {formProperties.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Form pendaftaran kelas{" "}
              <b>
                {formProperties.title} {classProperties.eyd}
              </b>
              . Harap diisi dengan teliti dan benar.
            </DialogContentText>
            <Box sx={{ px: 2 }}>
              <Typography sx={{ mt: 3, mb: 1 }} variant="h4">
                {account.name}
              </Typography>

              {/* FORM INPUT: status / role */}
              <FormControl variant="filled" sx={{ minWidth: "100%", mb: 2 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  color={formProperties.colorBase}
                >
                  Murid / Pembina
                </InputLabel>
                <Select
                  color={formProperties.colorBase}
                  labelId="demo-simple-select-filled-label"
                  id="role"
                  name="role"
                  displayEmpty={true}
                  label="Role"
                  onChange={handleChangeRole}
                >
                  <MenuItem
                    id="role"
                    value={"Murid"}
                    color={formProperties.colorBase}
                    onMouseEnter={(e) =>
                      (e.target.style.color = formProperties.colorMenuItemHover)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = formProperties.colorMenuItem)
                    }
                  >
                    Murid
                  </MenuItem>
                  <MenuItem
                    id="role"
                    value={"Pembina"}
                    color={formProperties.colorBase}
                    onMouseEnter={(e) =>
                      (e.target.style.color = formProperties.colorMenuItemHover)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = formProperties.colorMenuItem)
                    }
                  >
                    Pembina
                  </MenuItem>
                </Select>
                {formStateError.role ? (
                  <FormHelperText error={formStateError.role}>
                    *Form ini tidak boleh kosong
                  </FormHelperText>
                ) : (
                  <FormHelperText>
                    *Mendaftar sebagai <b>Pembina</b> untuk mendampingi
                    internalisasi murid.
                  </FormHelperText>
                )}
              </FormControl>

              {/* FORM INPUT: group area */}
              <FormControl variant="filled" sx={{ minWidth: "100%", mb: 2 }}>
                <InputLabel
                  id="demo-simple-select-label"
                  color={formProperties.colorBase}
                >
                  Kelompok Jemaat
                </InputLabel>
                <Select
                  color={formProperties.colorBase}
                  labelId="demo-simple-select-filled-label"
                  id="group"
                  name="group"
                  label="Kelompok Jemaat"
                  onChange={handleChangeGroup}
                >
                  {group &&
                    group.activeGroup.map((option) => (
                      <MenuItem
                        id="group"
                        value={option.nameShort}
                        color={formProperties.colorBase}
                        onMouseEnter={(e) =>
                          (e.target.style.color =
                            formProperties.colorMenuItemHover)
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = formProperties.colorMenuItem)
                        }
                      >
                        {option.nameShort}
                      </MenuItem>
                    ))}
                </Select>
                {formStateError.group ? (
                  <FormHelperText error={formStateError.group}>
                    *Form ini tidak boleh kosong
                  </FormHelperText>
                ) : (
                  <FormHelperText> </FormHelperText>
                )}
              </FormControl>

              {/* FORM INPUT: is married */}
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  color={formProperties.colorBase}
                >
                  Apakah saudara/i sudah menikah?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleRadioMarried}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio color={formProperties.colorBase} />}
                    label="Sudah Menikah"
                  />
                  <FormControlLabel
                    color={formProperties.colorBase}
                    value={false}
                    control={<Radio color={formProperties.colorBase} />}
                    label="Belum Menikah"
                  />
                </RadioGroup>
                {formStateError.isMarried ? (
                  <FormHelperText error={formStateError.isMarried}>
                    *Form ini tidak boleh kosong
                  </FormHelperText>
                ) : (
                  <FormHelperText> </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Typography
              sx={{ mt: 2, mb: 1 }}
              variant="body2"
              color={pallete.grey[800]}
            >
              Registration form details
            </Typography>
            <Divider />
            <Typography
              sx={{ mt: 1 }}
              variant="body2"
              color={pallete.grey[500]}
            >
              classID: {classProperties._id}
            </Typography>
            <Typography variant="body2" color={pallete.grey[500]}>
              userID: {account._id}
            </Typography>
            <Typography variant="body2" color={pallete.grey[500]}>
              {new Date().toString()}
            </Typography>
          </DialogContent>
          {isUploading ? (
            <Box sx={{ mt: 3, mb: 3, ml: 3, mr: 3 }}>
              <LinearProgress color={formProperties.colorBase} />
            </Box>
          ) : (
            <DialogActions>
              <Button
                color={formProperties.colorBase}
                onClick={handleCloseRegristrationDialog}
              >
                Batal
              </Button>
              <Button
                color={formProperties.colorBase}
                onClick={handleRegistrationButton}
              >
                Daftar
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </Container>
      {/* ERROR Snackbar */}
      <Snackbar
        open={openErrorSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={7000}
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
        autoHideDuration={10000}
        onClose={handleCloseSuccessSnackBar}
      >
        <Alert onClose={handleCloseSuccessSnackBar} severity="success">
          {successMessage} &#128077;
        </Alert>
      </Snackbar>
    </>
  );
}
