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

exports.checkAccessLevel1 = function(role) {
  return accessLevel1.includes(role);
};

exports.checkAccessLevel2 = function(role) {
  return accessLevel2.includes(role);
};

exports.checkAccessLevel3 = function(role) {
  return accessLevel3.includes(role);
};