import React from "react";
import axios from "axios";
import {
  Box,
  breadcrumbsClasses,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";
import Label from "../../components/Label";

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
        // sort log array: the most recent log at the top
        const recentSort = respond.data.logs.sort(function(a, b) {
          return parseInt(b.timeStamp) - parseInt(a.timeStamp);
        });
        setRespondAPI({logs:recentSort});
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
          <>
            <table>
              <tr>
                <th align={tableHeaderAligh} style={styleTableHeader}>
                  Time Stamp
                </th>
                <th align={tableHeaderAligh} style={styleTableHeader}>
                  Severity
                </th>
                <th align={tableHeaderAligh} style={styleTableHeader}>
                  Method
                </th>
                <th align={tableHeaderAligh} style={styleTableHeader}>
                  Message
                </th>
              </tr>
              {respondAPI.logs.map((data) => {
                return <LogRow eachLog={data} />;
              })}
            </table>
          </>
        )}
      </Container>
    </Page>
  );
}

const tableHeaderAligh = "left";
const styleTableHeader = {
  padding: "0 15px 5px 0px",
};
const styleTableData = {
  padding: "0 15px 0 0px",
};

function LogRow({ eachLog }) {
  return (
    <>
      <tr>
        <td style={styleTableData}>
          {new Date(parseInt(eachLog.timeStamp)).toString().split("G")[0]}
        </td>
        <td style={styleTableData}>
          <SeverityLabel>{eachLog.severity}</SeverityLabel>
        </td>
        <td style={styleTableData}>{eachLog.method}</td>
        <td style={styleTableData}>{eachLog.message}</td>
      </tr>
    </>
  );
}

function SeverityLabel({ children }) {
  switch (children) {
    case "success":
      return (
        <Label variant="ghost" color="primary">
          {children}
        </Label>
      );
    case "error":
      return (
        <Label variant="ghost" color="error">
          {children}
        </Label>
      );
    case "warning":
      return (
        <Label variant="ghost" color="warning">
          {children}
        </Label>
      );
    default:
      return <Label variant="ghost">undefined</Label>;
  }
}

