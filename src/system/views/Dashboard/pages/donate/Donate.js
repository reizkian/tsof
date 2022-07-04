import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Container, Avatar, Typography, Paper, Grid } from "@mui/material";
import Page from "../../components/Page";

export default function Donate() {
  const [account, setAccount] = useOutletContext();
  const [firstName, setFirstName] = React.useState();

  React.useEffect(() => {
    if (account.name) {
      setFirstName(account.name.split(" ")[0]);
    }
  }, [account]);

  return (
    <Page title="The School of Fire | Donasi">
      <Container maxWidth="xl">
        {account && (
          <>
            <Box sx={{ pb: 5 }}>
              <HeadMaster firstName={firstName} />
              <QrCode />
              <Contrib />
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
}

function HeadMaster({ firstName }) {
  return (
    <>
      <Box direction="column" alignItems="center" justifyContent="center">
        <Box sx={{ width: 1 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              cursor: "pointer",
            }}
            src={require("assets/img/melvin.png").default}
            alt={"Melvin"}
          />
        </Box>
        <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mx: "auto",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Melvin Aurel
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mx: "auto",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Kepala Sekolah
          </Typography>
          <Typography
            variant="body1"
            sx={{
              width: "80%",
              mt: 1,
              mx: "auto",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Hallo {firstName}! Donasi yang kamu berikan akan digunakan untuk
            pengembangan website, operasional hosting server, dan database.
            Semuanya dikerjakan oleh para <i>Designer</i> dan{" "}
            <i>Software Engineer</i> relawan &#128519;
          </Typography>
        </Box>
      </Box>
    </>
  );
}

function QrCode() {
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ mx: "auto" }}>
          <Grid container sx={{ mt: 2 }} justifyContent="center" spacing={5}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={5}>
                <Box sx={{ p: 2 }}>
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <img
                        width="150"
                        height="70"
                        src={require("assets/img/donate_ovo.png").default}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        width="100%"
                        src={require("assets/img/qr_ovo.png").default}
                      />
                    </Grid>
                  </Grid>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mx: "auto",
                      flexGrow: 1,
                      textAlign: "center",
                    }}
                  >
                    085157236637
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mx: "auto",
                      flexGrow: 1,
                      textAlign: "center",
                    }}
                  >
                    Reizkian Yesaya
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={10}>
                <Box sx={{ p: 2 }}>
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item>
                      <img
                        width="150"
                        height="70"
                        src={require("assets/img/donate_bca.png").default}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        width="100%"
                        src={require("assets/img/qr_bca.png").default}
                      />
                    </Grid>
                  </Grid>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      mx: "auto",
                      flexGrow: 1,
                      textAlign: "center",
                    }}
                  >
                    8831571471
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mx: "auto",
                      flexGrow: 1,
                      textAlign: "center",
                    }}
                  >
                    Reizkian Yesaya
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

function Contrib() {
  return (
    <>
      <Box sx={{ p: 3, mt: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            color: "text.secondary",
            mx: "auto",
            mb: 2,
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          Ingin berkontribusi dengan cara lain?
        </Typography>
        <Typography
            variant="body1"
            sx={{
              mt: 0,
              mb:4,
              mx: "auto",
              width: "80%",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Untuk develop website ini kami menggunakan beberapa
            software, tools, dan library. Jika kamu familiar dengan salah satunya, kamu bisa kirim email ke reizkianyesaya@gmail.com untuk lebih lanjut.
          </Typography>
        <Box
          component="img"
          src={require("assets/img/techstack.png").default}
          sx={{ width:"70%", mx: "auto" }}
        />
      </Box>
    </>
  );
}

function Engineer({ firstName }) {
  return (
    <>
      <Box direction="column" alignItems="center" justifyContent="center">
        <Box sx={{ width: 1 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              cursor: "pointer",
            }}
            src={require("assets/img/reizkian.png").default}
            alt={"Melvin"}
          />
        </Box>
        <Box sx={{ width: "80%", mx: "auto", mt: 2 }}>
          <Typography
            variant="h6"
            sx={{
              mx: "auto",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Reizkian Yesaya
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mx: "auto",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Software Engineer
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              mx: "auto",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Hi {firstName}! Untuk develop website ini kami menggunakan beberapa
            software, tools, dan library. Jika kamu familiar dengan salah satunya, kamu bisa email ke reizkianyesaya@gmail.com 
          </Typography>
        </Box>
      </Box>
    </>
  );
}
