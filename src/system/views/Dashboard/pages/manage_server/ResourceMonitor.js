import { Box, Container, Typography } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

export default function ResourceMonitor() {
  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl"><Box sx={{ pb: 5 }}>
        <PageTitle>Resource Monitor</PageTitle>
        </Box>
        </Container>
    </Page>
  );
}