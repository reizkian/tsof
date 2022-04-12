import { motion } from "framer-motion";
import { Typography } from "@mui/material";

export default function PageTitle({children}) {
  const animateFrom = { opacity: 0, y: -60 };
  const animateTo = { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={animateFrom}
      animate={animateTo}
      transition={{ delay: 0.25 }}
    >
      <Typography variant="h4">{children}</Typography>
    </motion.div>
  );
}
