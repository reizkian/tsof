import style from "./views/KelasPengajaran/KelasPengajaranRoot.module.css";
import NavBar from "../system/views/RegisterPage/NavBar/NavBar.js";
import Title from "../system/views/RegisterPage/Title/Title.js";
import Footer from "./views/LandingPage/Footer/Footer.js";
import Course from "./views/KelasPengajaran/Course/Course.js";

import { Box, Grid, Container, Typography,Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

export default function KelasPengajaran() {
  const course = [
    {
      title: "Kelas Murid Kristus",
      caption: "Murid Kristus merupakan kelas tahapan pertama dari rangkaian kelas pengajaran yang ada di School of Fire. Kelas ini mengajarkan dasar-dasar Iman Kekristenan yang mencakup Keselamatan, Yesus sebagai Tuhan, Baptis Air, Baptis Roh Kudus, Saat Teduh, Tertanam di Gereja Lokal. Setiap lulusan dari kelas ini diharapakan dapat memiliki pengertian yang benar dan teguh atas dasar-dasar ke-Kristenan.",
      src: require("assets/img/final-mk-2.png").default,
    },
    {
      title: "Kelas Pekerja Kristus",
      caption: "Pekerja Kristus merupakan tahap lanjutan dari Murid Kristus. Kelas ini mengajarkan nilai-nilai ke-Kristenan dalam kehidupan sehari-hari mencakup Kuasa Doa, Kuasa Komunitas Sel, Menginjil dan Bersaksi, Pergaulan Pria dan Wanita, Keuangan yang Merdeka, Kepemimpinan Rohani. Setiap lulusan dari kelas ini diharapkan mampu mengaplikasikan nilai kehidupan di keseharian berdasarkan dengan firman Tuhan. ",
      src: require("assets/img/final-pk.png").default,
    },
    {
      title: "Kelas Hamba Kristus",
      caption: "Hamba Kristus merupakan tahap akhir dari rangkaian kelas pengajaran yang ada di School of Fire. Kelas ini menolong anda untuk menemukan Alasan utama melayani,  Panggilan hidup dan Kehendak Tuhan.",
      src: require("assets/img/final-hk.png").default,
    }]

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <div className={style.containerFluid}>
        <NavBar />
        <Title />
        <div class={style.dividerContainer}>
          <img
            className={style.divider}
            src={require("assets/img/divider.png").default}
            alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
          />
        </div>
        
        {course.map((eachCourse)=>(
          <Course title={eachCourse.title} caption={eachCourse.caption} src={eachCourse.src}/>
        ))}

        <Footer />
      </div>
    </>
  );
}