import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import Paper from "@material-ui/core/Paper";

import style from "./views/LandingPage/LandingPageRoot.module.css";
import NavBar from "./views/LandingPage/NavBar/NavBar.js";
import Title from "./views/LandingPage/Title/Title.js";
import Value from "./views/LandingPage/Value/Value.js";
import Features from "./views/LandingPage/Features/Features.js";
import Testimony from "./views/LandingPage/Testimony/Testimony.js";
import Invitation from "./views/LandingPage/Invitation/Invitation.js";
import Footer from "./views/LandingPage/Footer/Footer.js";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
//   palette: {
//     primary: "green",
//   },
// }));

export default function LandingPage() {
  // const classes = useStyles();
  return (
    <>
      <div className={style.containerFluid}>
        <NavBar />
        <Title />
        <Value />
        <Features />
        <div className={style.dividerContainer}>
          <img
            className={style.divider}
            src={require("assets/img/divider.png").default}
            alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
          />
        </div>
        <Testimony />
        <Invitation />
        <Footer />
      </div>
      {/* <section id="title">
        <div className="container-fluid">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div className="brand-left">
                <h1 className="brand"> The School of Fire</h1>
                <p className="brand-verse big" align="justify">
                  Matius 28 : 19-20 “Karena itu pergilah, jadikanlah semua bangsa murid-Ku dan baptislah mereka dalam
                  nama Bapa dan Anak dan Roh Kudus, dan ajarlah mereka melakukan segala sesuatu yang telah Kuperintahkan
                  kepadamu. Dan ketahuilah aku menyertai kamu senantiasa sampai akhir zaman”
                </p>
                <Button className="button-register" color="inherit" href="/register">
                  Daftar Kelas Pengajaran
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} justify="center">
              <div className="brand-right">
                <img
                  className="brand-image"
                  width="355"
                  height="375"
                  src={require("assets/img/logo_sof.png").default}
                  alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>

      <section id="value">
        <div className="container-fluid">
          <h3 className="value-title"> Bertumbuh dan Berbuah</h3>
          <p className="value-verse" align="center">
            Bukan kamu yang memilih Aku, tetapi Akulah yang memilih kamu. Dan Aku telah menetapkan kamu, supaya kamu
            pergi dan menghasilkan buah dan buahmu itu tetap, supaya apa yang kamu minta kepada Bapa dalam nama-Ku,
            diberikan-Nya kepadamu.
          </p>
          <p className="value-verse" align="center">
            <b>Yohanes 15 : 16</b>
          </p>
          <div className="value-card">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Paper className={classes.paper} elevation={5}>
                  <div className="value-card-content">
                    <img
                      className="value-card-image"
                      width="75"
                      height="75"
                      src={require("assets/img/value1.png").default}
                      alt=""
                    />
                    <p className="value-verse">
                      <b>Pergi</b>
                    </p>
                    <p className="value-text">
                      Kemana saudara pergi? Saudara pergi ketempat Allah mengutus saudara. Apakah saudara seorang
                      pelajar? seorang mahasiswa? atau pegawai kantor? Bukan suatu kebetulan saudara pergi ketempat
                      tersebut. Itu tempat Allah mengutus saudara. Setiap orang percaya adalah seorang utusan Injil!
                    </p>
                    <p className="value-text">
                      Saudara diutus oleh Allah ke tempat dimana anda berada. Tujuannya adalah Saudara harus
                      menghasilkan buah dan buah saudara tinggal tetap.
                    </p>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} elevation={5}>
                  <div className="value-card-content">
                    <img
                      className="value-card-image"
                      width="75"
                      height="75"
                      src={require("assets/img/value2.png").default}
                      alt=""
                    />
                    <p className="value-verse">
                      <b>Menghasilkan Buah</b>
                    </p>
                    <p className="value-text">
                      Di dalam Kejadian 1 : 24 terdapat sebuah prinsip reproduksi yaitu “masing-masing menurut jenisnya”
                      Mangga menghasilkan mangga. Padi menghasilkan beras. Jagung menghasilkan jagung. Seorang kristen
                      menghasilkan orang kristen.
                    </p>
                    <p className="value-text">
                      Orang percaya juga harus menghasilkan orang percaya. Ini berarti buah dari orang percaya adalah
                      petobat yang dihasilkannya dengan menjangkau jiwa-jiwa dan membawa mereka kepada Tuhan Yesus
                      Kristus
                    </p>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} elevation={5}>
                  <div className="value-card-content">
                    <img
                      className="value-card-image"
                      width="60"
                      height="75"
                      src={require("assets/img/value3.png").default}
                      alt=""
                    />
                    <p className="value-verse">
                      <b>Buah Tinggal Tetap</b>
                    </p>
                    <p className="value-text">
                      Satu-satunya cara supaya buah saudara tinggal tetap adalah dengan memelihara petobat-petobat yang
                      saudara hasilkan (menggembalakan).
                    </p>
                    <p className="value-text">
                      Yohanes 21:17 Kata Yesus kepadanya untuk ketigakalinya: “Simon, anak Yohanes, apakah engkau
                      mengasihi Aku? Maka sedih hati Petrus karena Yesus berkata untuk ketigakalinya: “Apakah engkau
                      mengasihi Aku?” Dan Ia berkata kepada-Nya: “Tuhan, Engkau tahu segala sesuatu, Engkau tahu, bahwa
                      aku mengasihi Engkau. Kata Yesus kepadanya: “Gembalakanlah domba-domba-Ku”
                    </p>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container-fluid features">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div className="features-left">
                <img
                  className="features-icon"
                  width="50"
                  height="50"
                  src={require("assets/img/plant.png").default}
                  alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
                />
                <h1 className="features-title "> Belajar Firman Tuhan di dampingi oleh konselor</h1>
                <p className="brand-verse big" align="justify">
                  Konselor akan membina dan menuntun pertumbuhan rohani saudara selama kelas. Mereka akan selalu
                  mengingatkan saudara untuk tidak lupa saat teduh dan berdoa. Mereka akan membantu saudara untuk
                  memahami dasar-dasar kekristenan.
                </p>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} justify="center">
              <div className="brand-right">
                <img
                  className="brand-image"
                  width="450"
                  height="350"
                  src={require("assets/img/features.png").default}
                  alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>

      <div className="divider">
        <img
          src={require("assets/img/divider.png").default}
          alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
        />
      </div>

      <section id="testimony">
        <div className="container-fluid" style={{ marginTop: "-70px" }}>
          <h3 className="value-title"> Kesaksian</h3>
          <p className="value-verse" align="center">
            Mereka yang sudah menyelesaikan kelas pengajaran bersaksi atas apa yang mereka peroleh
          </p>
          <Grid container spacing={3} style={{ marginTop: "30px" }}>
            <Grid item xs={4}>
              <Paper className={classes.paper} elevation={5}>
                <div className="value-card-content">
                  <img
                    className="value-card-image avatar"
                    width="75"
                    height="75"
                    src={require("assets/img/joel.png").default}
                    alt=""
                  />
                  <p className="testimony-name">
                    <b>Joel Abdipatra</b>
                  </p>
                  <p className="testimony-occ">SMA Debrito Yogyakarta</p>
                  <p className="value-text">
                    Di kelas Murid Kristus aku belajar banyak tentang dasar-dasar kekristenan. Hal yang utama adalah aku
                    diselamatkan karena Tuhan Yesus begitu mengasihiku.
                  </p>
                </div>

                <div className="chip-container">
                  <Grid container>
                    <Grid item xs={6}>
                      <div className="chip-button">
                        <Button className="mk">Murid Kristus</Button>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="chip-date">
                        <p className="date">18 Mei 2021</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper} elevation={5}>
                <div className="value-card-content">
                  <img
                    className="value-card-image avatar"
                    width="75"
                    height="75"
                    src={require("assets/img/melvin.png").default}
                    alt=""
                  />
                  <p className="testimony-name">
                    <b>Melvin Aurel</b>
                  </p>
                  <p className="testimony-occ">Mahasiswi Farmasi UGM Yogyakarta</p>
                  <p className="value-text">
                    Kelas Pekerja Kristus menanamkan nilai-nilai kekristenan dalam kehidupan sehari-hari mulai dari
                    keuangan, pasangan hidup, dan berkomunitas.
                  </p>
                </div>

                <div className="chip-container">
                  <Grid container>
                    <Grid item xs={6}>
                      <div className="chip-button">
                        <Button className="pk">Pekerja Kristus</Button>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="chip-date">
                        <p className="date">18 Mei 2021</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper} elevation={5}>
                <div className="value-card-content">
                  <img
                    className="value-card-image avatar"
                    width="75"
                    height="75"
                    src={require("assets/img/marco.png").default}
                    alt=""
                  />
                  <p className="testimony-name">
                    <b>Marco Christian Cibro</b>
                  </p>
                  <p className="testimony-occ">Mahasiswa Teknik UGM Yogyakarta</p>
                  <p className="value-text">
                    Setelah mengikuti kelas Hamba Kristus saya mengerti tujuan-Nya untuk apa saya diciptakan. Dengan ini
                    saya yakin akan panggilan Tuhan atas hidup saya.
                  </p>
                </div>
                <div className="chip-container">
                  <Grid container>
                    <Grid item xs={6}>
                      <div className="chip-button">
                        <Button className="hk">Hamba Kristus</Button>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="chip-date">
                        <p className="date">18 Mei 2021</p>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </section>

      <div className="divider">
        <img
          src={require("assets/img/divider.png").default}
          alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
        />
      </div>

      <section id="invitation">
        <div className="container-fluid">
          <Grid container style={{ marginTop: "30px" }}>
            <Grid item xs={12} sm={6}>
              <div className="brand-left">
                <h1 className="invitation-title"> Sahabat baru? Ayo ikut kelas Murid Kritus</h1>
                <p className="brand-verse big" align="justify">
                  Mulai bertekun dalam pengajaran yang benar diawali dari mengenal dasar-dasar kekristenan. Saudara akan
                  belajar mengenai Keselamatan, Yesus sebagai Tuhan, Baptis Air, Baptis Roh Kudus, Saat Teduh, dan
                  Tertanam dalam Gereja lokal.
                </p>
                <Button className="button-register-mk" color="inherit" href="/register">
                  Daftar Kelas Pengajaran
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} justify="center">
              <div className="brand-right">
                <img
                  className="brand-image"
                  width="400"
                  height="355"
                  src={require("assets/img/Jesus0.png").default}
                  alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>

      <section id="docs">
        <div className="container-fluid">
          <Grid container style={{ marginTop: "60px" }}>
            <Grid item xs={12} sm={6}>
              <h2 className="docs-brand">The School of Fire</h2>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul>
                <li className="docs-nav">
                  <a className="docs-link" href="/" target="_blank" rel="noopener noreferrer">Contact Us</a>
                </li>
                <li className="docs-nav">
                  <a className="docs-link" href="https://www.instagram.com/theschooloffiregkkd/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
                </li >
                <li className="docs-nav">
                  <a className="docs-link" href="/" target="_blank" rel="noopener noreferrer">Twitter</a>
                </li>
                <li className="docs-nav">
                  <a className="docs-link" href="/" target="_blank" rel="noopener noreferrer">Documentation</a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>
      </section> */}
    </>
  );
}
