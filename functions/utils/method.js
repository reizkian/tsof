exports.getCurrentTime = function(req, res) {
  // ~ calibrated for GMT+07
  var currentdate_calibrated_miliseconds = Date.now() + (1000*60*60*7);
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

exports.getCompoundID = function(object, userID) {
  const time = new Date().valueOf();
  const compoundID = time + "_" + object + "_" + userID;
  return compoundID;
};
