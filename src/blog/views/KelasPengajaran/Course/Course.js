import { Box, Grid, Container, Typography } from "@mui/material";

export default function Course(props) {
  console.log(props);
  return (
    <div>
      <Container maxWidth="xl" sx={{ mb: "30px", mt: "20px" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={5}>
            <Box component="img" src={props.src} maxWidth />
          </Grid>
          <Grid item xs={12} md={6} lg={7} sx={{display: "flex",
                alignItems:"center"}}>
            <Box
              sx={{
                px: "10px",
                mx: "auto",
                my: "20px",
                flexGrow: 1,
                textAlign: "center",
                display: "flex",
                alignItems:"center"
              }}
            >
              <div>
                <Typography variant="h4" sx={{ mb: "15px" }}>
                  {props.title}
                </Typography>
                <Typography align="justify">{props.caption}</Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
