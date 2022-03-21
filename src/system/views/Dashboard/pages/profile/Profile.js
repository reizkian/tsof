import { motion } from "framer-motion";
// material
import { Box, Grid, Container, Typography } from "@mui/material";
import Page from "../../components/Page";
import MetaData from "./MetaData";
import PersonalData from "./PersonalData";

export default function Profile() {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };

  let personalData = {
    _id: "EZZNyHwhSyYmGQjvqdN4o6FMNhm1",
    _verified: true,
    address:
      "Jl Medang Raya no.2 RT001/RW022, Bencongan, Kelapa Dua, Tangerang",
    addressGeoLocation: {
      lat: -6.2613805,
      lng: 106.6122107,
    },
    birthdate: "1996-10-03",
    city: "Tangerang",
    email: "reizkianyesaya@gmail.com",
    name: "Reizkian Yesaya Radityatama",
    phone: "+6285157236637",
    role: "System Administrator",
    sex: "Male",
    imageURL:
      "https://firebasestorage.googleapis.com/v0/b/the-school-of-fire.appspot.com/o/users%2Fimages%2Favatar_male.jpg?alt=media&token=47e5f00f-105a-4443-a970-7c5533b6e9cc",
  };

  return (
    <Page title="The School of Fire | Profile">
      <Container maxWidth="xl">
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
      </Container>
    </Page>
  );
}
