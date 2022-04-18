import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Container,
  Typography,
  Grid,
} from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

export default function Beranda() {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };

  const cardMuridKristus = (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={require("assets/img/final-mk-2.png").default}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Murid Kristus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelas ini mengajarkan dasar-dasar Iman ke-kristenan yang mencakup
            Keselamatan, Yesus sebagai Tuhan, Baptis Air, Baptis Roh Kudus, Saat
            Teduh, dan Tertanam di Gereja Lokal.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: "#9D26CA",
            "&:hover": {
              backgroundColor: "#F5DCFF",
            },
          }}
        >
          Daftar
        </Button>
      </CardActions>
    </Card>
  );

  const cardPekerjaKristus = (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={require("assets/img/final-pk.png").default}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Pekerja Kristus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelas ini mengajarkan nilai-nilai ke-Kristenan dalam kehidupan
            sehari-hari mencakup Kuasa Doa, Kuasa Komunitas Sel, Menginjil dan
            Bersaksi, Pergaulan Pria dan Wanita, Keuangan yang Merdeka,
            Kepemimpinan Rohani.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: "#FFA500",
            "&:hover": {
              backgroundColor: "#FFEDCB",
            },
          }}
        >
          Daftar
        </Button>
      </CardActions>
    </Card>
  );

  const cardHambaKristus = (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={require("assets/img/final-hk.png").default}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hamba Kristus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelas Hamba Kristus menolong anda untuk menemukan Alasan utama
            melayani, Panggilan hidup dan Kehendak Tuhan.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Daftar
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {cardMuridKristus}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {cardPekerjaKristus}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {cardHambaKristus}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
