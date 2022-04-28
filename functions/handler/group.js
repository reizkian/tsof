const {
  firebaseDatabase,
} = require("../utils/admin");

exports.getGroupList = function(req, res) {
  firebaseDatabase
    .ref("group")
    .get()
    .then((respond) => {
      const respondArray = Object.values(respond.val());
      return res.status(200).json({ activeGroup: respondArray });
    });
};
