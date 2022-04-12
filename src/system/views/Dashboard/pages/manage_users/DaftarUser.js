import { Box, Container, Typography } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

export default function DaftarUser() {
  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl"><Box sx={{ pb: 5 }}>
        <PageTitle>Daftar User</PageTitle>
        </Box>
        </Container>
    </Page>
  );
}