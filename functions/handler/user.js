const { firebaseDatabase } = require("../utils/admin");
const { jwtEncodeUtil, jwtDecodeUtil } = require("../utils/jwt");
const { checkAccessLevel3 } = require("./authorization");

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

exports.getUserList = function(req, res) {
  // parse firebase user credential
  const firebaseUserCredentials = jwtDecodeUtil(req.body.token);
  // parse personal data
  const personalData = firebaseUserCredentials.personalData;
  // check authorization level 3
  const isAuthorized = checkAccessLevel3(personalData.role);

  if (isAuthorized) {
    // get users data
    firebaseDatabase
      .ref("users")
      .orderByChild("_id")
      .get()
      .then((respond) => {
        const respondArray = Object.values(respond.val());
        const payloadData = {
          users: respondArray,
        };
        // encode payload data
        const token = jwtEncodeUtil(payloadData);
        // return respond
        return res.json({token:token});
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      });
  } else {
    return res.status(500).json({ message: "unathorized access" });
  }
};