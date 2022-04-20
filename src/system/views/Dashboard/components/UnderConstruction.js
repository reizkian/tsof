import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// components
import { MotionContainer, varBounceIn } from "../components/animate";
import Page from "../components/Page";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(10),
  palette: {
    primary: {
      light: "#71d689",
      main: "#54c06e;",
      dark: "#4cb365",
      contrastText: "#fff",
    },
  },
}));

export default function UnderConstruction({page}) {
  return (
    <>
      <div style={{ marginTop: "0%" }}>
        <RootStyle>
          <Container>
            <MotionContainer initial="initial" open>
              <Box sx={{ maxWidth: 600, margin: "auto", textAlign: "center" }}>
                <motion.div variants={varBounceIn}>
                  <Typography variant="h4" paragraph>
                   {page}
                  </Typography>
                </motion.div>
                <Typography  sx={{ color: "text.secondary" }}>
                  Mohon maaf, halaman ini masih dalam tahap pengembangan
                </Typography>
                <div style={{ marginTop: "-5%" }}>
                  <motion.div variants={varBounceIn}>
                    <Box
                      component="img"
                      src={require("assets/img/build.png").default}
                      sx={{ height: 450, mx: "auto", mt:10}}
                    />
                  </motion.div>
                </div>
              </Box>
            </MotionContainer>
          </Container>
        </RootStyle>
      </div>
    </>
  );
}
