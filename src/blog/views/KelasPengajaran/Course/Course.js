import { Box, Grid, Container, Typography } from "@mui/material";

export default function Course(props) {
  console.log(props)
  return (
    <div>
      <Container maxWidth="xl" sx={{mt:"70px"}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={5}>
            <Box
              component="img"
              src={props.src}
              maxWidth
            />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Typography variant="h4" sx={{mb:"15px"}}>{props.title}</Typography>
            <Typography align="justify">{props.caption}</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
