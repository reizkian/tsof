import React from "react";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";
import UnderConstruction from "../../components/UnderConstruction";
import { titleCase } from "system/util/string";

export default function SaatTeduh() {

  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        {/* <Box sx={{ pb: 5 }}>
          <PageTitle>SaatTeduh</PageTitle>
        </Box> */}
        <UnderConstruction page="Saat Teduh"/>
      </Container>
    </Page>
  );
}
