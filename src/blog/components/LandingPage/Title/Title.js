import style from "./Title.module.css";
import { motion } from "framer-motion";

export default function Title() {
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <>
      <section className={style.Title}>
        <div className={style.containerFluidTitle}>
          <div className={style.brandTitle}>
            <motion.h1
              className={style.titleTSOF}
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.05 }}
            >
              The School of Fire
            </motion.h1>
            <motion.p
              className={style.titleVerse}
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.15 }}
            >
              Matius 28 : 19-20 “Karena itu pergilah, jadikanlah semua bangsa murid-Ku dan baptislah mereka dalam nama
              Bapa dan Anak dan Roh Kudus, dan ajarlah mereka melakukan segala sesuatu yang telah Kuperintahkan
              kepadamu. Dan ketahuilah aku menyertai kamu senantiasa sampai akhir zaman”
            </motion.p>
            <motion.a
              className={style.buttonRegister}
              href="/register"
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.25 }}
            >
              Daftar Kelas Pengajaran
            </motion.a>
          </div>
          <div className={style.brandImage}>
            <motion.img
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.05 }}
              className={style.logoTSOF}
              width="355"
              height="375"
              src={require("assets/img/logo_sof.png").default}
              alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
            />
          </div>
        </div>
      </section>
    </>
  );
}
