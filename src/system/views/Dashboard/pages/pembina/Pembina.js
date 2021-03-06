import { Box, Container } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

export default function Pembina() {
  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <PageTitle>Pembina</PageTitle>
        </Box>
      </Container>
    </Page>
  );
}
