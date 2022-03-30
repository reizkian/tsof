const base64 = require("base-64");
const Blob = require("node-blob");

exports.getCurrentTime = function(req, res) {
  //  calibrated for GMT+07
  var currentdate_calibrated_miliseconds = Date.now() + 1000 * 60 * 60 * 7;
  var currentdate_calibrated = new Date(currentdate_calibrated_miliseconds);
  var datetime =
    currentdate_calibrated.getDate() +
    "-" +
    (currentdate_calibrated.getMonth() + 1) +
    "-" +
    currentdate_calibrated.getFullYear() +
    "@" +
    currentdate_calibrated.getHours() +
    ":" +
    currentdate_calibrated.getMinutes() +
    ":" +
    currentdate_calibrated.getSeconds() +
    ":GMT+07";

  // console.log("uncalibrated miliseconds: ", Date.now());
  // console.log("--calibrated miliseconds: ", currentdate_calibrated_miliseconds);
  // console.log("----------------------------------------------------")
  // console.log("uncalibrated date: ", new Date(Date.now()));
  // console.log("--calibrated date: ", datetime);
  return datetime;
};

exports.getCompoundID = function(userID) {
  const time = new Date().valueOf();
  const compoundID = time + "_" + userID;
  return compoundID;
};

exports.getBlobFromURI = function(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = base64.decode(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
};
