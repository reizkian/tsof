import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
// material
import {
  Box,
  Grid,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
import Page from "../../components/Page";
import MetaData from "./MetaData";
import PersonalData from "./PersonalData";

export default function Profile() {
  const { personalData } = useSelector((state) => state.auth);
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };

  return (
    <Page title="The School of Fire | Profile">
      <Container maxWidth="xl">
        {personalData === undefined ? (
          <LinearProgress />
        ) : (
          <>
            {" "}
            <Box sx={{ pb: 5 }}>
              <motion.div
                initial={animateFrom}
                animate={animateTo}
                transition={{ delay: 0.25 }}
              >
                <Typography variant="h4">
                  Hallo {personalData.name.split(" ")[0]}!
                </Typography>
              </motion.div>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MetaData personalData={personalData} />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <PersonalData personalData={personalData} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Page>
  );
}
