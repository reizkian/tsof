import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Paper, Typography, Box } from "@mui/material";
import { MotionContainer, varBounceIn } from "./animate";

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Tidak Ditemukan
      </Typography>
      <Typography variant="body2" align="center">
        Hasil pencarian untuk &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong> tidak ditemukan.
      </Typography>
      <div style={{ marginTop: "-5%" }}>
        <motion.div variants={varBounceIn}>
          <Box
            component="img"
            src={require("assets/img/searching.png").default}
            sx={{ height: 250, mx: "auto", mt: 10, mb: 0 }}
          />
        </motion.div>
      </div>
    </Paper>
  );
}
