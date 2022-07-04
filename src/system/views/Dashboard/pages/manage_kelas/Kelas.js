import React from "react";
import axios from "axios";

import { Box, Container, LinearProgress } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

export default function Kelas() {
  const [classData, setClassData] = React.useState();
  React.useEffect(() => {
    fetchClassData().then((respond) => {
      setClassData(respond.data.classes);
    });
  }, []);

  function fetchClassData() {
    return axios.get("class", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <PageTitle>Kelas</PageTitle>
        </Box>
        {classData ? <>{JSON.stringify(classData[0])}</> : <LinearProgress />}
      </Container>
    </Page>
  );
}
