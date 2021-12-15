import { Box, Card, Link, Drawer, Typography, Avatar } from "@mui/material";

export default function MetaData({ personalData }) {
  console.log(personalData);
  return (
    <>
      <Card>
        <Box sx={{ my: 3, mx: "auto" }}>
          <Avatar
            sx={{ width: 130, height: 130, mx: "auto" }}
            src={personalData.photoURL}
            alt={personalData.displayName}
          />

          <Box sx={{ my: 3, mx: "auto" }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "text.primary", mx: "auto", flexGrow: 1, textAlign: "center" }}
            >
              {personalData.name}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mx: "auto", flexGrow: 1, textAlign: "center" }}>
              {personalData.role}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
}
