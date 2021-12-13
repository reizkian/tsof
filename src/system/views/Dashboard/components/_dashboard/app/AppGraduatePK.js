import { Icon } from "@iconify/react";
import likeFilled from "@iconify/icons-ant-design/like-filled";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: "#7a4f01",
  backgroundColor: "#ffe28c",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: "#B78103",
  backgroundImage: `linear-gradient(135deg, ${alpha("#7a4f01", 0)} 0%, ${alpha("#7a4f01", 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 1351;

export default function AppGraduatePK() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={likeFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Lulus Pekerja Kristus
      </Typography>
    </RootStyle>
  );
}
