import React, { useState, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cropper from "react-easy-crop";
import {
  generateDownload,
  generateCroppedImageDataURL,
} from "system/util/image";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import "./Dialog.css";

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

export default function MetaData({ personalData }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  }, []);

  const [profileState, setProfileState] = React.useState(personalData);
  const [open, setOpen] = React.useState(false);
  const [imageDataURL, setImageDataURL] = React.useState(null);
  const handleClickOpenImageDialog = () => {
    setOpen(true);
  };
  const handleCloseImageDialog = () => {
    setOpen(false);
  };

  // ~ handle selected picture file
  function onSelectFile(event) {
    // ~ check file is exist
    if (event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      const fileSizeLimit = 2 * 1024 * 1024; // 1 MB limit
      if (imageFile.size > fileSizeLimit) {
        handleOpenErrorSnackBar();
        document.getElementById("imageInput").value = "";
        setZoom(1);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.addEventListener("load", () => {
        setImageDataURL(reader.result);
      });

      // ~ open dialog cropper
      handleClickOpenImageDialog();
      // ~ reset dialog cropper parameter for new file
      document.getElementById("imageInput").value = "";
      setZoom(1);
    }
  }

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

  function onSaveCroppedImageButton() {
    // setCroppedImageDataURL(generateCroppedImageDataURL(imageDataURL, croppedArea));
    generateCroppedImageDataURL(personalData._id, imageDataURL, croppedArea)
      .then((croppedImageDataURL) => {
        // ~ wait async function to resolve cropped image data URL
        setProfileState((prevState) => ({
          ...prevState,
          imageURL: croppedImageDataURL,
        }));
        console.log(profileState);
        return croppedImageDataURL;
      })
      .then((croppedImageDataURL) => {
        const payloadData = { imageDataURL: croppedImageDataURL };
        console.log(payloadData);
        // ~ POST request handled by updateImageURL callback server
        axios.post(`/user/image/${profileState._id}`, payloadData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleCloseImageDialog();
      });
  }

  // ~ click on image trigger choose file input
  function handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  function postImageToServer(_id, image) {
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("image", image, image.name);
    console.log(Array.from(formData));
  }

  function handleSubmit(event) {
    setProfileState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <>
      <Card>
        <Box sx={{ p: "3%", my: 3, mx: "auto" }}>
          <a onClick={handleEditPicture}>
            <Avatar
              sx={{ width: 130, height: 130, mx: "auto" }}
              src={personalData.imageURL}
              alt={personalData.displayName}
            />
          </a>
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
              open={open}
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
                          <Box textAlign="center" sx={{ mt: "1%" }}>
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
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Box>
              </DialogContent>
            </BootstrapDialog>
          </div>
          <Box sx={{ my: 3, mx: "auto" }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.primary",
                mx: "auto",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              {personalData.name}
            </Typography>
            <Typography
              variant="body1"
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
        </Box>
      </Card>
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
          Ukuran file tidak boleh melebihi 2MB
        </Alert>
      </Snackbar>
    </>
  );
}
