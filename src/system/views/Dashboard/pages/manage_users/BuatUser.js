import { Box, Container, Typography } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

export default function BuatUser() {
  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl"><Box sx={{ pb: 5 }}>
        <PageTitle>Buat User</PageTitle>
        </Box>
        </Container>
    </Page>
  );
}