exports.getCurrentTime = function() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getFullYear() +
    "@" +
    (currentdate.getHours() + 7) +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds() + 
    ":GMT+07";
  return datetime;
};

exports.getCompoundID = function(object, userID ){
  const time = new Date().valueOf()
  const compoundID = time+ "_" + object + "_" +userID;
  return compoundID;
};