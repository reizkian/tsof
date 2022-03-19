const { firebaseDatabase } = require("./admin");

exports.checkEmailVerified = function(email) {
  // ~ qurey SELECT * FROM users WHERE email=
  return firebaseDatabase
    .ref("users")
    .orderByChild("email")
    .equalTo(email)
    .get()
    .then((respond) => {
      const respondArray = Object.values(respond.val());
      const isVerified = respondArray[0]._verified;
      return isVerified;
    });
};

