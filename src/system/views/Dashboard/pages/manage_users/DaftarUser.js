import React from "react";
import axios from "axios";

import {
  Box,
  Container,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { jwtDecodeUtil } from "system/util/jwt";
import { useDispatch, useSelector } from "react-redux";
import { setUserList } from "system/redux/reducer/table";

import Page from "../../components/Page";
import PageTitle from "../../components/PageTitle";
import TableUser from "./TableUser";

export default function DaftarUser() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.table);
  const [isDataExist, setIsDataExist] = React.useState(
    userList.users === undefined ? false : true
  );
  const [usersObject, setUserObject] = React.useState(userList);

  React.useEffect(() => {
    if (isDataExist) {
      setUserObject(userList);
    } else {
      getUsersDataAPI();
    }
  }, [isDataExist, usersObject]);

  function getUsersDataAPI() {
    const payloadData = {
      token: localStorage.getItem("firebaseUserCredential"),
    };

    axios
      .post("get-user-list", payloadData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((respond) => {
        const encodedRespondData = respond.data.token;
        const decodedRespondData = jwtDecodeUtil(encodedRespondData);
        dispatch(setUserList(decodedRespondData));
        setIsDataExist(true);
      })
      .catch((err) => {
        console.log(err.respond);
      });
  }

  return (
    <Page title="The School of Fire | Sistem Informasi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <PageTitle>Daftar User</PageTitle>
        </Box>
        {isDataExist ? <TableUser data={usersObject} /> : <LinearProgress />}
      </Container>
    </Page>
  );
}
