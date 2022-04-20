import React from "react";
import axios from "axios";
import { jwtEncodeUtil } from "system/util/jwt";
import { Link as RouterLink } from "react-router-dom";
import { firebaseStorage, firebaseStorageRef } from "system/util/admin";
import { ref, deleteObject } from "firebase/storage";
import {
  Box,
  Menu,
  Button,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";

import Iconify from "system/views/Dashboard/components/Iconify";
import ScrollBar from "system/views/Dashboard/components/Scrollbar";
import { checkAccessLevel } from "system/util/authorization";

export default function MoreMenu({ swapData }) {
  const reactRef = React.useRef(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
  const [userData, setUserData] = React.useState(swapData);
  const [openSnackbarWarning, setOpenSnackbarWarning] = React.useState(false);
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = React.useState(false);
  const [openSnackbarError, setOpenSnackbarError] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const accessLevel = checkAccessLevel();
  const isAuthorized = accessLevel.level3;

  React.useEffect(() => {
    setUserData(swapData);
    setIsUploading(false);
  }, [openMenu]);

  function handleUserDataChange(event) {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenMenu(false);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
    setOpenMenu(false);
  };

  function handleCloseSnackBarWarning(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbarWarning(false);
  }
  function handleCloseSnackBarSuccess(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbarSuccess(false);
  }
  function handleOpenErrorSnackBar() {
    setOpenSnackbarError(true);
  }
  function handleCloseSnackBarError(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbarError(false);
  }

  function handleSave() {
    if (isAuthorized) {
      updateUserPersonalData();
    } else {
      setOpenMenu(false);
      setOpenDialog(false);
      setOpenSnackbarWarning(true);
    }
  }

  function updateUserPersonalData() {
    setIsUploading(true);
    // encode data
    const encodedPayloadData = { token: jwtEncodeUtil(userData) };
    // http post
    axios
      .post(`user/${userData._id}`, encodedPayloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        console.log(respond.data);
        setOpenSnackbarSuccess(true);
        setOpenDialog(false);
        setOpenMenu(false);
        window.location.reload();
      })
      .catch((err) => {
        setErrorMessage("Internal server error");
        setOpenDialog(false);
        handleOpenErrorSnackBar();
      });
  }

  function handleMenuDelete(event) {
    if (isAuthorized) {
      setOpenDialogDelete(true);
    } else {
      setOpenMenu(false);
      setOpenSnackbarWarning(true);
    }
  }

  function deleteUser() {
    setIsUploading(true);
    console.log(`deleting user: ${userData._id}`);
    axios
      .delete(`user/${userData._id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("firebaseUserCredential"),
        },
      })
      .then(() => {
        const imageRef = ref(
          firebaseStorageRef,
          `users/images/${userData._id}.png`
        );

        deleteObject(imageRef)
          .then(() => {
            console.log("trigger delete image");
            setIsUploading(false);
            setOpenDialogDelete(false);
            setOpenSnackbarSuccess(true);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            setErrorMessage("Internal server error");
            setOpenDialogDelete(false);
            handleOpenErrorSnackBar();
          });
      })
      .catch((err) => {
        console.log(err)
        console.log("axios error");
        setErrorMessage("Internal server error");
        setOpenDialogDelete(false);
        handleOpenErrorSnackBar();
      });
  }

  return (
    <>
      <IconButton ref={reactRef} onClick={() => setOpenMenu(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={openMenu}
        anchorEl={reactRef.current}
        onClose={() => setOpenMenu(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }} onClick={handleMenuDelete}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Hapus"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
          onClick={handleClickOpen}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Detail"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>

      {/* DIALOG UPDATE USER */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Ubah Data User</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 500 }}>
            <ScrollBar style={{ maxHeight: 500 }}>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Nama"
                type="text"
                fullWidth
                variant="filled"
                value={userData.name}
                onChange={handleUserDataChange}
                sx={{ mb: 3 }}
              />
              <FormControl variant="filled" sx={{ minWidth: 500, mb: 2 }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="role"
                  name="role"
                  value={userData.role}
                  displayEmpty={true}
                  renderValue={() => userData.role}
                  label="Role"
                  onChange={handleUserDataChange}
                >
                  <MenuItem id="role" value={"Murid"}>
                    Murid
                  </MenuItem>
                  <MenuItem id="role" value={"Pembina"}>
                    Pembina
                  </MenuItem>
                  <MenuItem id="role" value={"Penanggung Jawab Kelas"}>
                    Penanggung Jawab Kelas
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                id="classID"
                name="classID"
                label="ID Murid"
                type="text"
                fullWidth
                variant="filled"
                value={userData.classID ? userData.classID.student : ""}
                onChange={handleUserDataChange}
                sx={{ mb: 3 }}
              />
              <TextField
                margin="dense"
                id="classID"
                name="classID"
                label="ID Pembina"
                type="text"
                fullWidth
                variant="filled"
                value={userData.classID ? userData.classID.counselor : ""}
                onChange={handleUserDataChange}
                sx={{ mb: 3 }}
              />
              <TextField
                margin="dense"
                id="classID"
                name="classID"
                label="ID Penanggung Jawab Kelas"
                type="text"
                fullWidth
                variant="filled"
                value={userData.classID ? userData.classID.admin : ""}
                onChange={handleUserDataChange}
                sx={{ mb: 3 }}
              />
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="filled"
                value={userData.email}
                onChange={handleUserDataChange}
                sx={{ mb: 3 }}
              />
              <TextField
                margin="dense"
                id="city"
                name="city"
                label="Kota"
                type="text"
                fullWidth
                variant="filled"
                value={userData.city}
                onChange={handleUserDataChange}
                sx={{ mb: 3 }}
              />
              <TextField
                margin="dense"
                id="address"
                name="address"
                label="Alamat"
                type="text"
                fullWidth
                variant="filled"
                value={userData.address}
                onChange={handleUserDataChange}
              />
            </ScrollBar>
          </Box>
        </DialogContent>
        {isUploading ? (
          <Box sx={{ mt: 3, mb: 3, ml: 3, mr: 3 }}>
            <LinearProgress />
          </Box>
        ) : (
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogActions>
        )}
      </Dialog>

      {/* DIALOG DELETE USER */}
      <Dialog open={openDialogDelete} onClose={handleCloseDialogDelete}>
        <DialogTitle>Hapus Data User</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 500 }}>
            Data user yang telah di hapus tidak akan bisa dikembalikan.
            Keputusan ini bersifat permanen! Apakah anda yakin?
          </Box>
        </DialogContent>
        {isUploading ? (
          <Box sx={{ mt: 3, mb: 3, ml: 3, mr: 3 }}>
            <LinearProgress />
          </Box>
        ) : (
          <DialogActions>
            <Button onClick={handleCloseDialogDelete}>Batal</Button>
            <Button onClick={deleteUser}>Hapus</Button>
          </DialogActions>
        )}
      </Dialog>

      {/* WARNING */}
      <Snackbar
        open={openSnackbarWarning}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleCloseSnackBarWarning}
      >
        <Alert
          onClose={handleCloseSnackBarWarning}
          severity="warning"
          align="left"
        >
          Oops! Hanya <b>Kepala Sekolah</b> dan <b>System Administrator</b> yang
          dapat melakukan perubahan data user
        </Alert>
      </Snackbar>
      {/* SUCCESS */}
      <Snackbar
        open={openSnackbarSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleCloseSnackBarSuccess}
      >
        <Alert onClose={handleCloseSnackBarSuccess} severity="success">
          Update Success
        </Alert>
      </Snackbar>
      {/* ERROR */}
      <Snackbar
        open={openSnackbarError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleCloseSnackBarError}
      >
        <Alert onClose={handleCloseSnackBarError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
