import {jwtDecodeUtil} from "./jwt"

const accessLevel0 = [
  "System Administrator",
  "Kepala Sekolah",
  "Penanggung Jawab Kelas",
  "Pembina",
  "Murid",
];

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

function checkAccessLevel0(role) {
  return accessLevel0.includes(role);
}

function checkAccessLevel1(role) {
  return accessLevel1.includes(role);
}

function checkAccessLevel2(role) {
  return accessLevel2.includes(role);
}

function checkAccessLevel3(role) {
  return accessLevel3.includes(role);
}

export function checkAccessLevel() {
  const encodedPersonalData = localStorage.getItem("personalData")
  const decodedPersonalData = jwtDecodeUtil(encodedPersonalData)
  const role = decodedPersonalData.role;

  let accessLevel = {
    level0: checkAccessLevel0(role),
    level1: checkAccessLevel1(role),
    level2: checkAccessLevel2(role),
    level3: checkAccessLevel3(role),
  };

  return accessLevel;
}
