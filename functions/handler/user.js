const { firebaseDatabase } = require("../utils/admin");
const {
  jwtEncodeUtil,
  jwtDecodeUtil,
} = require("../utils/jwt");

exports.getUserPersonalData = function(req, res) {
  //  get user ID from parametric route
  const userID = req.params._id;
  //  get user data
  firebaseDatabase
    .ref("users/" + userID)
    .get()
    .then((respond) => {
      // encode personal data
      const payloadData = { token: jwtEncodeUtil(respond.val()) };
      // return respond
      return res.status(200).json(payloadData);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

exports.updateUserPersonalData = function(req, res) {
  // decode data
  const userID = req.params._id;
  const personalData = jwtDecodeUtil(req.body.token);
  delete personalData.iat;
  // write to Firebase Database
  firebaseDatabase
    .ref("users/" + userID)
    .set(personalData)
    .then(() => {
      return res.status(201).json({ message: "update berhasil" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.getUserList = function(req, res) {};
