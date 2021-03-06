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
  paddingTop: theme.spacing(15),
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

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <div style={{ marginTop: "0%" }}>
        <RootStyle title="The School of Fire | 404 Not Found">
          <Container>
            <MotionContainer initial="initial" open>
              <Box sx={{ maxWidth: 580, margin: "auto", textAlign: "center" }}>
                <motion.div variants={varBounceIn}>
                  <Typography variant="h4" paragraph>
                    Maaf, halaman tidak ditemukan!
                  </Typography>
                </motion.div>
                <Typography sx={{ color: "text.secondary" }}>
                  Maaf, kami tidak dapat menemukan halaman yang Anda cari.
                  Mungkin Anda salah memasukan URL? Pastikan untuk memeriksanya kembali.
                </Typography>
                <div style={{ marginTop: "-5%" }}>
                  <motion.div variants={varBounceIn}>
                    <Box
                      component="img"
                      src={require("assets/img/404.png").default}
                      sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                    />
                  </motion.div>
                </div>
                <Button
                  to="/dashboard/murid/saat-teduh"
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  color="primary"
                >
                  Kembali
                </Button>
              </Box>
            </MotionContainer>
          </Container>
        </RootStyle>
      </div>
    </>
  );
}
