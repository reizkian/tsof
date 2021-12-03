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

exports.getCompoundID = function(userID, type){
  var currendate = new Date();
  const compoundID = userID + "_" + type + "_" + currendate;
  return compoundID;
};