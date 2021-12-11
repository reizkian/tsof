import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

LogoText.propTypes = {
  sx: PropTypes.object,
};

export default function LogoText({ sx }) {
  const styleLogoText = { 
      fontFamily: "Playfair Display", 
      fontWeight: 600, 
      fontSize: "1.4rem",
      color: "#303031",
      textAlign: "justify",
      textJustify: "inter-word",
      marginLeft:"11%",
    };

  return (
    <Box sx={{ width: 250, height: 40, ...sx }}>
      <p style={styleLogoText}>The School of Fire</p>
    </Box>
  );
}
