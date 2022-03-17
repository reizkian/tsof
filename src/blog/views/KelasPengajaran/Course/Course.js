import { Box, Grid, Container, Typography } from "@mui/material";

export default function Course(props) {
  return (
    <div>
      <Container maxWidth="xl" sx={{ mb: "30px", mt: "20px" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={5}>
            <Box component="img" src={props.eachCourse.src} maxWidth />
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
                  {props.eachCourse.title}
                </Typography>
                <Typography align="justify" display="inline" variant="subtitle1">{props.eachCourse.caption_0}</Typography>
                <Typography align="justify" display="inline" variant="subtitle1" color={props.eachCourse.color} sx={{ fontWeight: 'bold' }}>{props.eachCourse.caption_1}</Typography>
                {/* <Typography align="justify" display="inline">{props.eachCourse.caption_2}</Typography> */}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}