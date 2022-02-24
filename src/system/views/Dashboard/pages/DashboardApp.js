import { motion } from "framer-motion";
import { MotionContainer, varBounceIn } from "../components/animate";
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
  AppMap
} from "../components/_dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp(props) {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <MotionContainer initial="initial" open>
      <Page title="The School of Fire - System">
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
          <motion.div initial={animateFrom} animate={animateTo} transition={{ delay: 0.25 }}>
              <Typography variant="h4">Hi, Welcome to The Fire Community!</Typography>
            </motion.div>    
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={varBounceIn}>
                <AppGraduateMK />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={varBounceIn}>
                <AppGraduatePK />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={varBounceIn}>
                <AppGraduateHK />
              </motion.div>
            </Grid>
            {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteActivity />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppEnrolled />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppPerArea />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppTextClassifier />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
          <Grid item xs={12} md={6} lg={12}>
            <AppMap/>
          </Grid>
          </Grid>
        </Container>
      </Page>
    </MotionContainer>
  );
}
