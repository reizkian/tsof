import React from "react";
import axios from "axios";
import { Box, Container, LinearProgress } from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";

export default function ServerLog() {
  const [respondAPI, setRespondAPI] = React.useState({});

  function getServerActivityLogAPI() {
    axios
      .get("activity/get-log", {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("firebaseUserCredential"),
        },
      })
      .then((respond) => {
        console.log(respond.data);
        setRespondAPI(respond.data);
      });
  }

  React.useEffect(() => {
    getServerActivityLogAPI();
  }, []);

  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <PageTitle>Server Log</PageTitle>
        </Box>
        {respondAPI.logs === undefined ? (
          <LinearProgress />
        ) : (
          respondAPI.logs.map((data) => {
            return <LogRow eachLog={data} />;
          })
        )}
      </Container>
    </Page>
  );
}

function LogRow({ eachLog }) {
  console.log(eachLog);
  return <>{eachLog.timeStamp} {eachLog.method} {eachLog.severity} <br></br></>;
}
