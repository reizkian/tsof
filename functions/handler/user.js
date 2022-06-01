const { admin, firebaseDatabase } = require("../utils/admin");
const { getCurrentTime } = require("../utils/method");
const { jwtEncodeUtil, jwtDecodeUtil } = require("../utils/jwt");
const { checkAccessLevel2, checkAccessLevel3 } = require("./authorization");
const { logActivity } = require("./log");

/** getUserPersonalData
 * 
 * get "db/users/id/"
 * @param userID
 * @return {object} {token: jwt_encoded_data}
 */

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

/** updateUsersPersonalData
 * 
 * update "db/users/id/"
 * @param {object} {token: jwt_encoded_data}
 */

exports.updateUserPersonalData = function(req, res) {
  // decode data
  const userID = req.params._id;
  const personalData = jwtDecodeUtil(req.body.token);
  delete personalData.iat;
  // write to Firebase Database
  firebaseDatabase
    .ref("users/" + userID)
    .update(personalData)
    .then(() => {
      logActivity(
        userID,
        "updateUserPersonalData",
        "success",
        `updating user ${userID}`
      );
      return res.status(201).json({ message: "update berhasil" });
    })
    .catch((err) => {
      console.log(err);
      logActivity(
        userID,
        "updateUserPersonalData",
        "error",
        `updating user ${userID}`
      );
      return res.status(500).json({ message: "Internal server error" });
    });
};

/** deleteUser
 * 
 * delete "db/users/id/"
 * delete account userID from firebaseAuth
 * @param {string} deletedUserID userID to be deleted
 * @param {encoded object} firebaseUserCredential
 */

exports.deleteUser = function(req, res) {
  // parsing role from request
  const { headers } = req;
  const firebaseUserCredential = jwtDecodeUtil(headers.authorization);
  const isAuthorized = checkAccessLevel3(
    firebaseUserCredential.personalData.role
  );
  // parsing userID to be deleted
  const deleteUserID = req.params._id;
  const authorizedUserID = firebaseUserCredential.personalData._id;

  if (isAuthorized) {
    firebaseDatabase
      .ref(`users/${deleteUserID}`)
      .get()
      .then((respond) => {
        const deleteUserData = respond.val();
        admin
          .auth()
          .deleteUser(deleteUserID)
          .then(() => {
            console.log("delete success");
            firebaseDatabase
              .ref("users/" + deleteUserID)
              .remove()
              .then(() => {
                // log
                logActivity(
                  authorizedUserID,
                  "deleteUser",
                  "success",
                  `deleting user ${deleteUserData.name} ${deleteUserData.email}`
                );
                return res.status(200).json({ message: "Delete success" });
              })
              .catch((err) => {
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              });
          })
          .catch((err) => {
            return res.status(500).json({ message: "Internal server error" });
          });
      });
  } else {
    // log
    logActivity(
      authorizedUserID,
      "deleteUser",
      "error",
      "unauthorized attempt to delete a user"
    );
    return res.status(500).json({ message: "Unathorized access" });
  }
};

/** getUserPList
 * 
 * get "db/users/"
 * @param {encoded object} firebaseUserCredential
 * @return {encoded object} {users:[object]}
 */

exports.getUserList = function(req, res) {
  // parse firebase user credential
  const firebaseUserCredentials = jwtDecodeUtil(req.body.token);
  // parse personal data
  const personalData = firebaseUserCredentials.personalData;
  // check authorization level 3
  const isAuthorized = checkAccessLevel2(personalData.role);

  if (isAuthorized) {
    // get users data
    firebaseDatabase
      .ref("users")
      .orderByChild("_id")
      .get()
      .then((respond) => {
        const respondArray = Object.values(respond.val());
        // respond object payload data
        const payloadData = {
          users: respondArray,
        };
        // encode payload data
        const token = jwtEncodeUtil(payloadData);
        // return respond
        return res.json({ token: token });
      })
      .catch((err) => {
        return res.status(500).json({ message: "Internal server error" });
      });
  } else {
    return res.status(500).json({ message: "Unathorized access" });
  }
};
