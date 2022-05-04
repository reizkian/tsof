const { firebaseDatabase } = require("../utils/admin");
const { checkAccessLevel3 } = require("./authorization");
const { jwtDecodeUtil } = require("../utils/jwt");

exports.logActivity = function(userID, method, severity, message) {
  const payloadData = {
    userID: userID,
    timeStamp: Date.now().toString(),
    method: method,
    severity: severity,
    message: message,
  };
  firebaseDatabase
    .ref(`logs/`)
    .push(payloadData)
    .then(() => {})
    .catch((err) => {
      console.log("internal server error, write database");
      console.log(err);
    });
};

exports.getLogActivity = function(req, res) {
  const { headers } = req;
  const firebaseUserCredential = jwtDecodeUtil(headers.authorization);
  const isAuthorized = checkAccessLevel3(
    firebaseUserCredential.personalData.role
  );

  if (isAuthorized) {
    firebaseDatabase
      .ref("logs/")
      .get()
      .then((respond) => {
        const respondArray = Object.values(respond.val());
        const payloadData = {
          logs: respondArray,
        };
        return res.status(200).json(payloadData);
      });
  } else {
    return res.status(500).json({ message: "Unathorized access" });
  }
};
