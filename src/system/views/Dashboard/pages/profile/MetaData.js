import { ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorageRef } from "system/util/admin";

import { useDispatch } from "react-redux";
import { setPersonalData } from "system/redux/reducer/auth";

import React, { useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import { dataURLtoBlob, generateCroppedImageDataURL } from "system/util/image";
import { jwtEncodeUtil } from "system/util/jwt";
// import "react-image-crop/dist/ReactCrop.css";
import {
  Box,
  Button,
  Card,
  Typography,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import "./Dialog.css";

export default function MetaData({ personalData }) {
  const dispatch = useDispatch();

  // STATE: user personal data
  const [profileState, setProfileState] = React.useState(personalData);
  const [isUpdated, setIsUpdated] = React.useState(false);

  // STATE: react easy cropper
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  // STATE: image dialog
  const [openImageDialog, setOpenImageDialog] = React.useState(false);
  const [imageDataURL, setImageDataURL] = React.useState(null);
  const [croppedImageDataURL, setCroppedImageDataURL] = React.useState(null);

  const handleClickOpenImageDialog = () => {
    setOpenImageDialog(true);
  };
  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  // STATE: upload progress
  const [uploadProgress, setUploadPorgress] = React.useState(0);
  const [
    uploadProgressVisibility,
    setUploadProgressVisibility,
  ] = React.useState("none");
  const [
    saveImageButtonVisibility,
    setSaveImageButtonVisibility,
  ] = React.useState("");

  // STATE: error
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openErrorSnackBar, setOpenErrorSnackBar] = React.useState(false);

  // STATE: success
  const [successMessage, setSuccessMessage] = React.useState("");
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);

  // FUNCTION: handle selected picture file
  function onSelectFile(event) {
    //  check file is exist
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      const fileSizeLimit = 2 * 1024 * 1024; // 1 MB limit

      // error handling to limit file size
      if (imageFile.size > fileSizeLimit) {
        setErrorMessage("ukuran file tidak boleh melebihi 2MB");
        handleOpenErrorSnackBar();
        document.getElementById("imageInput").value = "";
        setZoom(1);
        return;
      }

      // read image file as data url
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.addEventListener("load", () => {
        setImageDataURL(reader.result);
      });

      //  open dialog cropper
      handleClickOpenImageDialog();

      //  reset dialog cropper parameter for new file
      document.getElementById("imageInput").value = "";
      setZoom(1);
    }
  }

  // FUNCTION: overide Input element DOM
  function handleEditPicture() {
    // indentify <input> by element id
    const fileInput = document.getElementById("imageInput");
    // overide click
    fileInput.click();
  }

  // FUNCTION: upload image to Firebase Storage, then update component state
  function onSaveCroppedImageButton() {
    // generate image data url
    generateCroppedImageDataURL(imageDataURL, croppedArea).then(
      (croppedImageDataURL) => {
        setCroppedImageDataURL(croppedImageDataURL);
        const croppedImageBlob = dataURLtoBlob(croppedImageDataURL);
        console.log(croppedImageBlob);

        // Firebase Storage
        const imageRef = ref(
          firebaseStorageRef,
          `users/images/${profileState._id}.png`
        );
        const uploadTask = uploadBytesResumable(imageRef, croppedImageBlob);

        setSaveImageButtonVisibility("none");
        setUploadProgressVisibility("");

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setUploadPorgress(Math.round(progress));
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            handleCloseImageDialog();
            setSaveImageButtonVisibility("");
            setUploadProgressVisibility("none");
            // Update local state by setProfileState as imageURL is updated
            setProfileState((prevState) => ({
              ...prevState,
              imageURL: `https://firebasestorage.googleapis.com/v0/b/the-school-of-fire.appspot.com/o/users%2Fimages%2F${
                profileState._id
              }.png?alt=media`,
            }));
            // Set Profile State Is Updated
            setIsUpdated(true);
            // send updated user personal data to server
            // updateUserPersonalData(profileState);
          }
        );
      }
    );
  }

  React.useEffect(() => {
    if (isUpdated) {
      updateUserPersonalData(profileState);
    }
  }, [isUpdated]);

  // FUNCTION: update user imageURL at Firebase Database
  function updateUserPersonalData(newUserPersonalData) {
    // encode updated user personal data at profileState
    const encodedPayloadData = { token: jwtEncodeUtil(newUserPersonalData) };

    axios
      .post(`user/${profileState._id}`, encodedPayloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        // use image data URL for redux and local storage
        newUserPersonalData.imageURL = croppedImageDataURL;

        // set redux new personalData
        dispatch(setPersonalData(newUserPersonalData));

        // set local storage
        localStorage.setItem(
          "personalData",
          jwtEncodeUtil(newUserPersonalData)
        );

        // snackbar success message
        setSuccessMessage(respond.data.message);
        handleOpenSuccessSnackBar();
        return respond.data.message;
      })
      .catch((err) => {
        console.log(err.respond.data);
        setErrorMessage(err.respond.data.message);
        handleOpenErrorSnackBar();
      });
  }

  // FUNCTION: success snack bar
  function handleOpenSuccessSnackBar() {
    setOpenSuccessSnackBar(true);
  }
  function handleCloseSuccessSnackBar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackBar(false);
  }

  // FUNCTION: error snack bar
  function handleOpenErrorSnackBar() {
    setOpenErrorSnackBar(true);
  }
  function handleCloseErrorSnackBar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackBar(false);
  }

  return (
    <>
      <Card>
        <Box sx={{ p: "3%", my: 3, mx: "auto" }}>
          <Avatar
            sx={{ width: 130, height: 130, mx: "auto", cursor: "pointer" }}
            src={profileState.imageURL}
            alt={profileState.displayName}
            onClick={handleEditPicture}
          />
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={onSelectFile}
          />

          <div>
            <BootstrapDialog
              onClose={handleCloseImageDialog}
              aria-labelledby="customized-dialog-title"
              open={openImageDialog}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleCloseImageDialog}
              >
                Foto Profil
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Box sx={{ width: "300px", height: "350px", p: "20%" }}>
                  <div className="App">
                    <Box sx={{ width: "150x", height: "150px" }}>
                      <div className="crop-container">
                        <Cropper
                          image={imageDataURL}
                          crop={crop}
                          zoom={zoom}
                          aspect={3 / 3}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                    </Box>
                    <div className="controls">
                      <Grid container>
                        <Grid item xs={12}>
                          <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => {
                              setZoom(e.target.value);
                            }}
                            className="zoom-range"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            textAlign="center"
                            sx={{
                              display: saveImageButtonVisibility,
                              mt: "1%",
                            }}
                          >
                            <Button
                              to="/dashboard/home"
                              id="save-cropped-image-button"
                              size="medium"
                              variant="text"
                              onClick={onSaveCroppedImageButton}
                            >
                              simpan
                            </Button>
                          </Box>
                          <Box
                            textAlign="center"
                            sx={{
                              display: uploadProgressVisibility,
                              mt: "1.5%",
                            }}
                          >
                            <CircularProgressWithLabel
                              value={uploadProgress}
                              visibility={uploadProgressVisibility}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Box>
              </DialogContent>
            </BootstrapDialog>
          </div>
          <Box sx={{ my: 1, mx: "auto" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mx: "auto",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              File *.jpg, *.png, *jpeg <br />
              ukuran maksimum 2 MB
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                mx: "auto",
                flexGrow: 1,
                textAlign: "center",
                mt: 3,
              }}
            >
              {personalData.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                mx: "auto",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              {personalData.role}
            </Typography>
          </Box>
          <Box sx={{ mt:3 }}>
          <Button
            onClick={handleEditPicture}
            sx={{ mx: "auto", flexGrow: 1, textAlign: "center"}}
            style={{margin: 'auto', display: "flex"}}
          >
            Upload Foto
          </Button>
          </Box>
        </Box>
      </Card>

      {/* ERROR Snackbar */}
      <Snackbar
        open={openErrorSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackBar}
        message="I love it"
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
        message="I love it"
      >
        <Alert onClose={handleCloseSuccessSnackBar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

// ---------------------------------------------- //
// M A T E R I A L  -  U I   C O M P O N E N T S  //
// ---------------------------------------------  //

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      />
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }} {...props}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...props}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          {...props}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
