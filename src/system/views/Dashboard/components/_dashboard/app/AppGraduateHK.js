import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: "#005249",
  backgroundColor: "#C8FACD",
}));

const TOTAL = 188;

export default function AppGraduateHK() {
  return (
    <RootStyle>
      {/* <IconWrapperStyle>
        <Icon icon={likeFilled} width={24} height={24} />
      </IconWrapperStyle> */}
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Lulus Hamba Kristus
      </Typography>
    </RootStyle>
  );
}
