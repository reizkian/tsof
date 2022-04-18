// material
import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: "#7a4f01",
  backgroundColor: "#ffe28c",
}));

const TOTAL = 419;

export default function AppGraduatePK() {
  return (
    <RootStyle>
      {/* <IconWrapperStyle>
        <Icon icon={likeFilled} width={24} height={24} />
      </IconWrapperStyle> */}
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Lulus Pekerja Kristus
      </Typography>
    </RootStyle>
  );
}
