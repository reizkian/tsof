import React from "react";
import axios from "axios";

import { motion } from "framer-motion";
import { Box, Container, Typography } from "@mui/material";
import SimpleBarReact from "simplebar-react";

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
          <Box six={{ height: 100, width:50 }}>
          <SimpleBarReact style={{ maxHeight: 300 }}>
            {[...Array(50)].map((x, i) => (
              <p>{i}</p>
            ))}
          </SimpleBarReact>
          </Box>
        </Box>

      </Container>
    </Page>
  );
}
