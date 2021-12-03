const firebase = require("firebase");
const config = require("../util/config");
const functions = require("firebase-functions");
const { admin } = require("../util/admin");
const { realTimeDataBase } = require("../util/admin");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const { getCurrentTime } = require("../util/method");
const { logActivity } = require("../handler/activity");
const { sendEmailWelcome } = require("../util/mailer");
const { getAddressGeoLocation } = require("../util/geolocation");

firebase.initializeApp(config);

// get JWT key from firebase environment variable
const privateKeyJWT = functions.config().tsof.jwt_key;

exports.signin = function(req, res) {
  /*
    take user email and password, pass it to firebase authentication
  */

  const payloadData = {
    token: req.body.token,
  };

  // get user data by decode jwt token
  const user = jwt.verify(payloadData.token, privateKeyJWT, { algorithm: "HS256" });
  const currentDateTime = new Date();
  delete user.iat;

  // ~ error handling
  let errors = {};
  if (user.email === "") {
    errors.email = "email cannot be empty";
  }
  if (user.password === "") {
    errors.email = "password cannot be empty";
  }

  // ~ firebase authentication
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((userCredentials) => {
      // ~ return id token
      return userCredentials.user.getIdToken();
    })
    .then((token) => {
      // ~ decode token, then get user ID
      req.decodedToken = jwtDecode(token);
      const userID = req.decodedToken.user_id;
      return userID;
    })
    .then((userID) => {
      // ~ logActivity: signin
      logActivity(userID, getCurrentTime(), "signin");
      // ~ check and get user role from realtime database
      console.log(`sign in request: ${user.email} ${userID}`);
      return realTimeDataBase
        .ref("users/" + userID)
        .child("role")
        .get()
        .then((role) => {
          var token;
          // ~ assign role to authentication token if user has role
          req.decodedToken.role = role.val();
          // ~ assign exp for authenticated session (added number in seconds) set for 1 month
          req.decodedToken.exp = req.decodedToken.iat + 60 * 60 * 24 * 30 * 1;
          token = req.decodedToken;
          console.log(token);
          token = jwt.sign(token, privateKeyJWT, { algorithm: "HS256" });
          return res.json({ token });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ general: "user and password not found" });
    });

  /*
    TO DO:
      [v] firebase authentication
      [v] save last login time stamp    
  */
};

exports.signup = function(req, res) {
  /*
    take user personal data, then create user by firebase authentication,
    then write personal data to realtime database
  */

  const payloadData = {
    // email: req.body.email.trim(),
    // password: req.body.password.trim(),
    // confirmPassword: req.body.confirmPassword.trim(),
    // name: req.body.name.trim(),
    // birthdate: req.body.birthdate.trim(),
    // phone: req.body.phone.trim(),
    // city: req.body.city.trim(),
    // address: req.body.address.trim(),
    token: req.body.token,
  };

  // get user data by decode jwt token
  const user = jwt.verify(payloadData.token, privateKeyJWT, { algorithm: "HS256" });
  const currentDateTime = new Date();
  delete user.iat;

  // ~ error handling
  let errors = {};
  if (user.email === "") {
    errors.email = "email cannot be empty";
  }
  if (user.password === "") {
    errors.password = "password cannot be empty";
  }
  if (user.confirmPassword === "") {
    errors.confirmPassword = "confirm password cannot be empty";
  }
  if (user.name === "") {
    errors.name = "name cannot be empty";
  }
  if (user.birthDate === "") {
    errors.birthDate = "birth date cannot be empty";
  }
  if (user.confirmPassword !== user.password) {
    errors.password = "confirm password is not the same as password";
    errors.confirmPassword = "confirm password is not the same as password";
  }

  if (Object.keys(errors).length > 0) {
    // ~ if any errors catched repond with errors message
    res.status(400).json({ error: errors });
  } else {
    // ~ else proceede to create user
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredentials) => {
        let userID = userCredentials.user.uid;
        // ~ add user object
        user._id = userID;
        // ~ logActivity: signup
        logActivity(userID, getCurrentTime(), "signup");
        // ~ send email welcome
        sendEmailWelcome(user.email, user.name);
        return user;
      })
      .then((user) => {
        req.user = user;
        // ~ delete password and confirm password
        delete user.password;
        delete user.confirmPassword;
        // ~ update user displayName
        if (firebase.auth().currentUser != null) {
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: user.name,
            })
            .then(() => {
              console.log("update user displayName:", user.name);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // ~ get addressGeoLocation
        getAddressGeoLocation(user.address)
          .then((addressGeoLocation) => {
            user.addressGeoLocation = addressGeoLocation;
            // ~ console log user data
            console.log("signup request user data: ", user);
            // ~ write user personal data to database
            realTimeDataBase
              .ref("users/" + user._id)
              .set(user)
              .then(() => {
                return res.status(201).json({ message: `user signed up successfully`, _id: req.user._id });
              })
              .catch((err) => {
                return res.status(500).json({ error: err });
              });
          })
          .catch((err) => {
            return res.status(500).json({ error: err });
          });
      });
  }

  /*
    TO DO:
    [v] create user using firebase authentication
    [v] design data structure
    [v] consult what data need to be collected
    ---------------------------------------------
{
  "email": "reizkianyesaya@gmail.com"
  "password": "********"
  "confirmPassword": "********"
  "name": "Reizkian Yesaya Radityatama"
  "phone": "085157236637"
  "birthdate": "2021-11-05"
  "city": "Tangerang"
  "address: "Jl. Kelapa Gading Selatan Blok SG2 no 16, Pakulonan Bar., Kec. Klp. Dua, Tangerang, Banten 15810"
}
  */
};
