const { firebaseDatabase } = require("../admin");

exports.verifyEmail = function(req, res) {
  // ~ get user ID from parametric route
  const userID = req.params._id;
  // ~ set email verification status on user ID
  firebaseDatabase
    .ref("users/" + userID + "/_verified")
    .set(true)
    .then(res.status(201).redirect("https://the-school-of-fire.web.app/signin"))
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
