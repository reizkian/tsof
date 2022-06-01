const { firebaseDatabase } = require("../utils/admin");

const { checkAccessLevel1 } = require("./authorization");

const { jwtEncodeUtil, jwtDecodeUtil } = require("../utils/jwt");
const { pushNotification } = require("./notification");

/** getActiveClassList
 * 
 * get "db/class" where "db/class/isActive" = true
 * @param null
 * @return {object} {activeClasses: [objects]}
 */

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


/** registerClass
 * 
 * post enrolled user at "db/class/enrolled"
 * update enrolled user at "db/user/userID/isMarried"
 * update enrolled user at "db/user/userID/group"
 * @param userID
 * @param {object} payload.classID
 * @param {string} payload.group
 * @param {boolean} payload.isMarried 
 */

exports.registerClass = function(req, res) {
  try {
    const userID = req.params._id;
    const payloadData = req.body;
    console.log(payloadData)

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
        // CLASS: add user
        switch (payloadData.role) {
          case "Murid":
            firebaseDatabase
              .ref(`class/${payloadData.classID.student}/enrolled`)
              .child(userID)
              .set({
                _id: userID,
                as: payloadData.role,
                iat: Date.now().toString(),
              })
              .then(() => {
                let courseName;
                switch (payloadData.classID.student.split("@")[1]) {
                  case "mk":
                    courseName = "Murid Kristus";
                    break;
                  case "pk":
                    courseName = "Pekerja Kristus";
                    break;
                  case "hk":
                    courseName = "Hamba Kristus";
                    break;
                  default:
                    courseName = "";
                }
                pushNotification(
                  userID,
                  "Registrasi Kelas",
                  `berhasil mendaftar kelas ${courseName} sebagai ${
                    payloadData.role
                  }`
                );
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
              })
              .then(() => {
                let courseName;
                switch (payloadData.classID.counselor.split("@")[1]) {
                  case "mk":
                    courseName = "Murid Kristus";
                    break;
                  case "pk":
                    courseName = "Pekerja Kristus";
                    break;
                  case "hk":
                    courseName = "Hamba Kristus";
                    break;
                  default:
                    courseName = "";
                }
                pushNotification(
                  userID,
                  "Registrasi Kelas",
                  `berhasil mendaftar kelas ${courseName} sebagai ${
                    payloadData.role
                  }`
                );
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
