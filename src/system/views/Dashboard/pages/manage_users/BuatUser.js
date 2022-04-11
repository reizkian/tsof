import React from "react";
import axios from "axios";

import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";

import Page from "../../components/Page";

export default function BuatUser() {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };
  
  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <motion.div
            initial={animateFrom}
            animate={animateTo}
            transition={{ delay: 0.25 }}
          >
            <Typography variant="h4">Buat User</Typography>
          </motion.div>
        </Box>
      </Container>
    </Page>
  );
}
