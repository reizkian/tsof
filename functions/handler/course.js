const { firebaseDatabase, privateKeyJWT } = require("../utils/admin");
const jwt = require("jsonwebtoken");

exports.createCourse = function(req, res) {
  // 1. get payload data
  const encodedPayloadData = {
    token: req.body.token,
  };

  // 2. decode payload data
  let decodedPayloadData;
  try {
    decodedPayloadData = jwt.verify(encodedPayloadData.token, privateKeyJWT, { algorithm: "HS256" });
  } catch (err) {
    return res.status(500).json({ error: "internal server error, cannot verify jwt" });
  }

  // 3. READ and check user role
  return firebaseDatabase
    .ref("users/" + decodedPayloadData.userID)
    .child("role")
    .get()
    .then((readedData) => {
      // 3.1 check
      const role = readedData.val();
      if (role !== "SystemAdministrator" && role !== "HeadMaster") {
        return res.status(403).json({ error: "forbidden, user not having necessary permissions" });
      }
    })
		.then(() => {
      // 4. WRITE course data to database
      firebaseDatabase
        .ref("courses")
        .set(decodedPayloadData.data)
        .then(() => {
          return res.status(201).json({ status: "course data is created in database" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "internal server error, cannot verify jwt" });
        });
    })
    .catch((err) => {
      console.log("internal server error, read database");
			console.log(err)
      return res.status(500).json({ error: "internal server error, read database" });
    });
};