import { motion } from "framer-motion";
// import clsx from "clsx"
import classes from "./Navbar.module.css"

const NavLinks = () => {
  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };
  return (
    <ul>
      <motion.li initial={animateFrom} animate={animateTo} transition={{delay:0.05}}>
        <div className={classes.PseudoButton}>
        <a href="/">Konseling</a>
        </div>
      </motion.li>
      <motion.li initial={animateFrom} animate={animateTo} transition={{delay:0.15}}>
      <div className={classes.PseudoButton}>
        <a href="/">Kelas Pengajaran</a>
        </div>
      </motion.li>
      <motion.li initial={animateFrom} animate={animateTo} transition={{delay:0.25}}>
      <div className={classes.PseudoButton}>
        <a href="/">Pertumbuhan Rohani</a>
        </div>
      </motion.li>
      <motion.li initial={animateFrom} animate={animateTo} transition={{delay:0.35}}>
      <div className={classes.PseudoButton}>
        <a className={classes.SignIn} href="/sign-in">Sign In</a>
        </div>
      </motion.li>
    </ul>
  );
};

export default NavLinks;
