const {
  admin,
  firebaseDatabase,
  firebaseAdmin,
  firebaseStorage,
} = require("../utils/admin");

const { checkAccessLevel2, checkAccessLevel3 } = require("./authorization");
const { jwtEncodeUtil, jwtDecodeUtil } = require("../utils/jwt");

exports.getActiveClassList = function(req, res) {
  firebaseDatabase
    .ref("class")
    .orderByChild("isActive")
    .equalTo(true).get()
    .then((respond) => {
        const respondArray = Object.values(respond.val());
        return res.status(200).json({ activeClasses: respondArray });
    });
};