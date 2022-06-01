const { firebaseDatabase } = require("../utils/admin");
const { logActivity } = require("./log");

/** pushNotification
 * 
 * post "db/notifications/userID/pushID/payloadData"
 * @param {string} userID
 * @param {string} title notification title
 * @param {string} description notification description
 */

exports.pushNotification = function(userID, title, description) {
  const payloadData = {
    timeStamp: Date.now().toString(),
    title: title,
    description: description,
    isUnRead: true,
  };
  firebaseDatabase
    .ref(`notifications/${userID}/`)
    .push(payloadData)
    .then(() => {})
    .catch((error) => {
      logActivity(
        userID,
        "pushNotification",
        "error",
        `failed to push notification ${title}`
      );
      console.log("push notification to database error");
      console.error(error);
    });
};

/** getUnReadNotifications
 * 
 * get "db/notifications/userID" where isUnRead = true
 * @param null
 * @return {object} {notifications: [objects]}
 */

exports.getUnReadNotifications = function(req, res) {
  const userID = req.params._id;
  firebaseDatabase
    .ref(`notifications/${userID}/`)
    .orderByChild("isUnRead")
    .equalTo(true)
    .get()
    .then((respond) => {
      const payloadData = {
        notifications: respond.val(),
      };
      return res.status(200).json(payloadData);
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({ message: "internal server error, read notifications" });
    });
};

/** setReadedNotifications
 * 
 * update multiple child nodes pushIDs "db/notifications/userID/pushIDs"
 * @param userID
 */

exports.setReadedNotifications = function(req, res) {
  const userID = req.params._id;
  firebaseDatabase
    .ref(`notifications/${userID}/`)
    .update(req.body)
    .then(() => {
      return res
        .status(200)
        .json({ message: "succes set notifications isUnRead true" });
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({ message: "internal server error, read notifications" });
    });
};
