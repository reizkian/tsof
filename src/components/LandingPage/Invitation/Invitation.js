import style from "components/LandingPage/Invitation/Invitation.module.css";
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
              Sahabat baru? Ayo ikut kelas Murid Kritus
            </motion.h1>
            <motion.p
              className={style.titleVerse}
              initial={animateFrom}
              animate={animateTo}
              transition={{ delay: 0.15 }}
            >
              Mulai bertekun dalam pengajaran yang benar diawali dari mengenal
              dasar-dasar kekristenan. Saudara akan belajar mengenai
              Keselamatan, Yesus sebagai Tuhan, Baptis Air, Baptis Roh Kudus,
              Saat Teduh, dan Tertanam dalam Gereja lokal.
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
              width="425"
              height="375"
              src={require("assets/img/Jesus0.png").default}
              alt="https://drive.google.com/uc?export=view&id=1rSaqlm1Cx8b3XswSFp3y53xYG_oCuNog"
            />
          </div>
        </div>
      </section>
    </>
  );
}
