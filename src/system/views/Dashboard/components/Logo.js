import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={require("assets/img/logo_sof.png").default} sx={{ width: 40, height: 45, ...sx }} />;
}
