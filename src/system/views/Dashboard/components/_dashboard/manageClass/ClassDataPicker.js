import React from "react";
import { Card, Box, Button, Grid, InputLabel, MenuItem, FormHelperText, FormControl, Select } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function ClassDataPicker() {
  const [age, setAge] = React.useState("");
  const [classID, setClassID] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeID = (event) => {
    setClassID(event.target.value);
  };

  return (
    <>
      <Card>
        <Box sx={{ px: "10px", mx: "auto", my:"20px", flexGrow: 1, textAlign: "center" }}>
          <Grid container spacing={3}>
            {/* SELECT: academic year */}
            <Grid item xs={12} md={3} lg={3}>
              <FormControl sx={{minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">Tahun Ajaran</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  label="academicYear"
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value={2022}>2022</MenuItem>
                  <MenuItem value={2021}>2021</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* SELECT: classID */}
            <Grid item xs={12} md={6} lg={6}>
              <FormControl sx={{minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">ID Kelas</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={classID}
                  label="academicYear"
                  fullWidth
                  onChange={handleChangeID}
                >
                  <MenuItem value={0}>MK@{Date.now() - age * 365 * 24 * 60 * 60}</MenuItem>
                  <MenuItem value={1}>PK@{Date.now() - age * 365 * 24 * 60 * 60}</MenuItem>
                  <MenuItem value={2}>HK@{Date.now() - age * 365 * 24 * 60 * 60}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Button to="/" fullWidth variant="contained" size="large" startIcon={<AddIcon />} sx={{mt:"3px"}}>
                Kelas Baru
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}
