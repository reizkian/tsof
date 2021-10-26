import style from "components/RegisterPage/Title/Title.module.css";
import { motion } from "framer-motion";

export default function Title() {
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <>
      <div className={style.brandTitle}>
        <motion.h1 className={style.titleTSOF} initial={animateFrom} animate={animateTo} transition={{ delay: 0.05 }}>
          The School of Fire
        </motion.h1>
      </div>
    </>
  );
}
