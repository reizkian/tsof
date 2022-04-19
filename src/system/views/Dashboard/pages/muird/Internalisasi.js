import { Box, Container, Typography } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";
import UnderConstruction from "../../components/UnderConstruction";

export default function Internalisasi() {
  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 5 }}>
          <PageTitle>Internalisasi</PageTitle>
        </Box> */}
        <UnderConstruction page="Internalisasi"/>
      </Container>
    </Page>
  );
}
