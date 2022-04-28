const {
  admin,
  firebaseDatabase,
  firebaseAdmin,
  firebaseStorage,
} = require("../utils/admin");

const {
  checkAccessLevel0,
  checkAccessLevel1,
  checkAccessLevel2,
  checkAccessLevel3,
} = require("./authorization");

const { jwtEncodeUtil, jwtDecodeUtil } = require("../utils/jwt");

exports.getActiveClassList = function(req, res) {
  firebaseDatabase
    .ref("class")
    .orderByChild("isActive")
    .equalTo(true)
    .get()
    .then((respond) => {
      const respondArray = Object.values(respond.val());
      return res.status(200).json({ activeClasses: respondArray });
    });
};

exports.registerClass = function(req, res) {
  try {
    const userID = req.params._id;
    const payloadData = req.body;

    // USER: update classID
    firebaseDatabase
      .ref(`users/${userID}`)
      .child("classID")
      .update(payloadData.classID)
      .then(() => {
        // USER: check role
        firebaseDatabase
          .ref(`users/${userID}`)
          .child("role")
          .get()
          .then((respond) => {
            const userRole = respond.val();
            if (checkAccessLevel1(userRole)) {
              // USER: only update group
              firebaseDatabase
                .ref(`users/${userID}`)
                .child("group")
                .set(payloadData.group)
                .then(() => {
                  // USER: update isMarried
                  firebaseDatabase
                    .ref(`users/${userID}`)
                    .child("isMarried")
                    .set(payloadData.isMarried);
                });
            }
            if (userRole === "Murid" || userRole === null) {
              // USER: update group
              firebaseDatabase
                .ref(`users/${userID}`)
                .child("group")
                .set(payloadData.group)
                .then(() => {
                  // USER: update role
                  firebaseDatabase
                    .ref(`users/${userID}`)
                    .child("role")
                    .set(payloadData.role)
                    .then(() => {
                      // USER: update isMarried
                      firebaseDatabase
                        .ref(`users/${userID}`)
                        .child("isMarried")
                        .set(payloadData.isMarried);
                    });
                });
            }
          });
      })
      .then(() => {
        // CLASS: push user
        switch (payloadData.role) {
          case "Murid":
            firebaseDatabase
              .ref(`class/${payloadData.classID.student}/enrolled`)
              .child(userID)
              .set({
                _id: userID,
                as: payloadData.role,
                iat: Date.now().toString(),
              });
            break;
          case "Pembina":
            firebaseDatabase
              .ref(`class/${payloadData.classID.counselor}/enrolled`)
              .child(userID)
              .set({
                _id: userID,
                as: payloadData.role,
                iat: Date.now().toString(),
              });
            break;
          default:
            break;
        }
      });
    return res.status(200).json({ message: "registration success" });
  } catch {
    return res.status(500).json({ message: "registration failed" });
  }
};
