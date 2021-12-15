import { motion } from "framer-motion";
import { MotionContainer, varBounceIn } from "../components/animate";

import { useSelector } from "react-redux";
// material
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  // AppTasks,
  AppGraduateHK,
  // AppBugReports,
  AppGraduatePK,
  // AppNewsUpdate,
  AppGraduateMK,
  // AppOrderTimeline,
  AppEnrolled,
  AppWebsiteActivity,
  // AppTrafficBySite,
  AppTextClassifier,
  AppPerArea,
  AppMap,
} from "../components/_dashboard/app";
import { PersonalData, MetaData } from "../components/_dashboard/profile";

export default function Profile({ account }) {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };

  const { personalData } = useSelector((state) => state.auth);
  
  return (
    <MotionContainer initial="initial" open>
      <Page title="The School of Fire - System">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <motion.div initial={animateFrom} animate={animateTo} transition={{ delay: 0.25 }}>
              <Typography variant="h4">Hallo {personalData.name.split(" ")[0]}!</Typography>
            </motion.div>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MetaData personalData={personalData}/>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <PersonalData personalData={personalData}/>
            </Grid>
          </Grid>
        </Container>
      </Page>
    </MotionContainer>
  );
}
