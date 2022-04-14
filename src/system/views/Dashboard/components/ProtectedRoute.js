import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPersonalData } from "system/redux/reducer/auth";
import { jwtDecodeUtil } from "system/util/jwt";

import Page401 from "system/views/Dashboard/pages/Page401";

export default function ProtectedRoute({ level, children }) {
  const dispatch = useDispatch();
  const { personalData } = useSelector((state) => state.auth);
  const [account, setAccount] = React.useState(personalData);

  React.useEffect(() => {
    if (personalData._id === undefined) {
      getUserPersonalData();
    }
  }, []);

  function getUserPersonalData() {
    const personalData = jwtDecodeUtil(localStorage.getItem("personalData"));
    dispatch(setPersonalData(personalData));
    setAccount(personalData);
  }

  let isAuthorized = null;
  switch (level) {
    case 1:
      isAuthorized = checkAccessLevel1(account.role);
      break;
    case 2:
      isAuthorized = checkAccessLevel2(account.role);
      break;
    case 3:
      isAuthorized = checkAccessLevel3(account.role);
      break;
  }

  if (isAuthorized) {
    return children;
  } else {
    return <Page401 account={account} />;
  }
}

const accessLevel1 = [
  "System Administrator",
  "Kepala Sekolah",
  "Penanggung Jawab Kelas",
  "Pembina",
];
const accessLevel2 = [
  "System Administrator",
  "Kepala Sekolah",
  "Penanggung Jawab Kelas",
];

const accessLevel3 = ["System Administrator", "Kepala Sekolah"];

function checkAccessLevel1(role) {
  return accessLevel1.includes(role);
}

function checkAccessLevel2(role) {
  return accessLevel2.includes(role);
}

function checkAccessLevel3(role) {
  return accessLevel3.includes(role);
}
