import style from "./views/KelasPengajaran/KelasPengajaranRoot.module.css";
import NavBar from "../system/views/RegisterPage/NavBar/NavBar.js";
import Title from "../system/views/RegisterPage/Title/Title.js";
import Footer from "./views/LandingPage/Footer/Footer.js";
import Course from "./views/KelasPengajaran/Course/Course.js";

export default function KelasPengajaran() {
  const course = [
    {
      title: "Kelas Murid Kristus",
      color: "#9d26ca",
      caption_0:
        "Murid Kristus merupakan kelas tahapan pertama dari rangkaian kelas pengajaran yang ada di School of Fire. Kelas ini mengajarkan dasar-dasar Iman Kekristenan yang mencakup ",
      caption_1:
        "Keselamatan, Yesus sebagai Tuhan, Baptis Air, Baptis Roh Kudus, Saat Teduh, Tertanam di Gereja Lokal. ",
      caption_2:
        " Setiap lulusan dari kelas ini diharapakan dapat memiliki pengertian yang benar dan teguh atas dasar-dasar ke-Kristenan.",
      src: require("assets/img/final-mk-2.png").default,
    },
    {
      title: "Kelas Pekerja Kristus",
      color: "#FFA500",
      caption_0:
        "Pekerja Kristus merupakan tahap lanjutan dari Murid Kristus. Kelas ini mengajarkan nilai-nilai ke-Kristenan dalam kehidupan sehari-hari mencakup ",
      caption_1:
        "Kuasa Doa, Kuasa Komunitas Sel, Menginjil dan Bersaksi, Pergaulan Pria dan Wanita, Keuangan yang Merdeka, Kepemimpinan Rohani. ",
      caption_2:
        "Setiap lulusan dari kelas ini diharapkan mampu mengaplikasikan nilai kehidupan di keseharian berdasarkan dengan firman Tuhan.",
      src: require("assets/img/final-pk.png").default,
    },
    {
      title: "Kelas Hamba Kristus",
      color: "#54c06e",
      caption_0:
        "Hamba Kristus merupakan tahap akhir dari rangkaian kelas pengajaran yang ada di School of Fire. Kelas ini menolong anda untuk menemukan Alasan utama melayani, ",
      caption_1: "Panggilan hidup dan Kehendak Tuhan.",
      caption_2: "",
      src: require("assets/img/final-hk.png").default,
    },
  ];

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

        {course.map((eachCourse) => (
          <div className={style.eachCourse}>
            <Course title={eachCourse.title} eachCourse={eachCourse} />
          </div>
        ))}

        <Footer />
      </div>
    </>
  );
}
