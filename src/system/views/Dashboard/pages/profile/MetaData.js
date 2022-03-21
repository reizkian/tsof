import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
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
  DialogActions,
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
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function MetaData({ personalData }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const [profileState, setProfileState] = React.useState(personalData);
  const [open, setOpen] = React.useState(false);
  const [fileURL, setFileURL] = React.useState(
    "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
  );

  const handleClickOpenImageDialog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // ~ handle selected picture file
  function onSelectFile(event) {
    const image = event.target.files[0];
    const imageURL = URL.createObjectURL(image);
    setFileURL(imageURL)
    console.log(image);
    console.log(imageURL);
    if (image) {
      handleClickOpenImageDialog();
      document.getElementById("imageInput").value = "";
    }
    // postImageToServer(personalData._id, image);
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
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogContent dividers>
                <Box sx={{ width: "350px", height: "400px", p: "20%" }}>
                  <div className="App">
                    <div className="crop-container">
                      <Cropper
                        image={fileURL}
                        crop={crop}
                        zoom={zoom}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                    <div className="controls">
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
    </>
  );
}
