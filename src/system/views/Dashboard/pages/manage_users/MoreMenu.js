import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";

import Iconify from "../../components/Iconify";

export default function MoreMenu({ swapData }) {
  console.log(swapData);
  const ref = React.useRef(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userData, setUserData] = React.useState(swapData);
  const [age, setAge] = React.useState('System Admin');

  React.useEffect(() => {
    setUserData(swapData);
  }, [openMenu]);

  function handleUserDataChange(event) {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenMenu(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setOpenMenu(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={openMenu}
        anchorEl={ref.current}
        onClose={() => setOpenMenu(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }}>
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
            primary="Ubah"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Ubah Data User</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 500 }}>
            <TextField
              margin="dense"
              id="name"
              label="Nama"
              type="text"
              fullWidth
              variant="filled"
              value={userData.name}
              sx={{ mb:3 }}
            />
            <FormControl variant="filled" sx={{ minWidth: 500, mb:2 }}>
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="role"
                value={age}
                label="Role"
                onChange={setAge}
              >
                <MenuItem value={"Murid"}>Murid</MenuItem>
                <MenuItem value={"Pembina"}>Pembina</MenuItem>
                <MenuItem value={"Penanggung Jawab Kelas"}>
                  Penanggung Jawab Kelas
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              variant="filled"
              value={userData.email}
              sx={{ mb:3 }}
            />
            <TextField
              margin="dense"
              id="classID"
              label="Kelas"
              type="text"
              fullWidth
              variant="filled"
              value={userData.classID}
              sx={{ mb:3 }}
            />
            <TextField
              margin="dense"
              id="city"
              label="Kota"
              type="text"
              fullWidth
              variant="filled"
              value={userData.city}
              sx={{ mb:3 }}
            />
            <TextField
              margin="dense"
              id="address"
              label="Alamat"
              type="text"
              fullWidth
              variant="filled"
              value={userData.address}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
