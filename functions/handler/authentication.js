const { firebaseDatabase, firebaseAuthentication } = require("../utils/admin");

const { logActivity } = require("./log");
const { pushNotification } = require("./notification");
const { sendEmailWelcome } = require("../utils/smtp/mailer");
const { useEmulators } = require("../utils/admin");
const { getAddressGeoLocation } = require("../utils/geolocation");

const {
  jwtEncodeUtil,
  jwtDecodeUtil,
  jwtDecodeFirebase,
} = require("../utils/jwt");

exports.signin = function(req, res) {
  /*
    take user email and password, pass it to firebase authentication
  */

  // get user data by decode jwt token
  const user = jwtDecodeUtil(req.body.token);
  const currentDateTime = new Date();
  delete user.iat;
  //  error handling
  let errors = {};
  if (user.email === "") {
    errors.email = "email cannot be empty";
  }
  if (user.password === "") {
    errors.email = "password cannot be empty";
  }

  //  check if user email is verified
  checkEmailVerified(user.email)
    .then((isVerified) => {
      //  check if email verification status
      if (isVerified) {
        //  proceed to firebase authentication
        firebaseAuthentication
          .signInWithEmailAndPassword(user.email, user.password)
          .then((userCredentials) => {
            //  return id token
            return userCredentials.user.getIdToken();
          })
          .then((token) => {
            //  decode token, then get user ID
            req.decodedToken = jwtDecodeFirebase(token);
            const userID = req.decodedToken.user_id;
            return userID;
          })
          .then((userID) => {
            //  check and get user personal data
            console.log(`sign in request: ${user.email} ${userID}`);
            return firebaseDatabase
              .ref("users/")
              .child(userID)
              .get()
              .then((personalData) => {
                var token;
                //  assign role to authentication token if user has role
                req.decodedToken.personalData = personalData.val();
                //  assign exp for authenticated session (added number in seconds) set for 3 days
                req.decodedToken.exp = req.decodedToken.iat + 60 * 60 * 24 * 3;
                token = jwtEncodeUtil(req.decodedToken);
                // console.log(token);
                //  logActivity: signin
                logActivity(
                  userID,
                  "signin",
                  "success",
                  `signin request ${user.email}`
                );
                return res.json({ token: token });
              });
          })
          .catch((err) => {
            console.error(err.code);
            let message =
              err.code === "auth/wrong-password"
                ? "email atau password tidak ditemukan"
                : err.code;
            logActivity(
              "-",
              "signin",
              "error",
              `${err.code} ${user.email}`
            );
            return res.status(500).json({ message: message });
          });
      }
      //  respond error to verified email
      else {
        logActivity(
          "-",
          "sigin",
          "warning",
          `email ${user.email} is not verified`
        );
        return res.status(500).json({
          message:
            "email anda belum terverifikasi, silakan cek kembali email anda",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.signup = function(req, res) {
  /*
    take user personal data, then create user by firebase authentication,
    then write personal data to realtime database
    
    * ENCODED DATA *
    email: req.body.email.trim(),
    password: req.body.password.trim(),
    confirmPassword: req.body.confirmPassword.trim(),
    name: req.body.name.trim(),
    birthdate: req.body.birthdate.trim(),
    phone: req.body.phone.trim(),
    city: req.body.city.trim(),
    address: req.body.address.trim(),
  */

  // get user data by decode jwt token
  const user = jwtDecodeUtil(req.body.token);
  const currentDateTime = new Date();
  delete user.iat;

  //  error handling
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
    //  if any errors catched repond with errors message
    res.status(400).json({ error: errors });
  } else {
    //  else proceede to create user
    firebaseAuthentication
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredentials) => {
        let userID = userCredentials.user.uid;
        //  add user object
        user._id = userID;
        user._verified = false;

        user.sex === "Male"
          ? (user.imageURL =
              "https://firebasestorage.googleapis.com/v0/b/the-school-of-fire.appspot.com/o/users%2Fimages%2Favatar_male.jpg?alt=media")
          : (user.imageURL =
              "https://firebasestorage.googleapis.com/v0/b/the-school-of-fire.appspot.com/o/users%2Fimages%2Favatar_female.jpg?alt=media");

        //  send email welcome
        if (!useEmulators) {
          sendEmailWelcome(user._id, user.email, user.name);
        }
        return user;
      })
      .then((user) => {
        req.user = user;
        //  delete password and confirm password
        delete user.password;
        delete user.confirmPassword;
        //  update user displayName
        if (firebaseAuthentication.currentUser != null) {
          firebaseAuthentication.currentUser
            .updateProfile({
              displayName: user.name,
            })
            .then(() => {
              // console.log("update user displayName:", user.name);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        //  get addressGeoLocation
        getAddressGeoLocation(`${user.address} ${user.city} ${user.province}`)
          .then((addressGeoLocation) => {
            user.addressGeoLocation = addressGeoLocation;
            //  console log user data
            console.log("signup request user from: ", user.email);
            //  write user personal data to database
            firebaseDatabase
              .ref("users/" + user._id)
              .set(user)
              .then(() => {
                // logActivity: signup
                logActivity(
                  user._id,
                  "signup",
                  "success",
                  `signup request ${user.email}`
                );
                pushNotification(
                  user._id,
                  "Registrasi Akun",
                  `berhasil, jangan lupa untuk update foto profil ya!`
                );
                return res.status(201).json({
                  message: `user signed up successfully`,
                  _id: req.user._id,
                });
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

checkEmailVerified = function(email) {
  //  qurey SELECT * FROM users WHERE email=
  return firebaseDatabase
    .ref("users")
    .orderByChild("email")
    .equalTo(email)
    .get()
    .then((respond) => {
      const respondArray = Object.values(respond.val());
      const isVerified = respondArray[0]._verified;
      return isVerified;
    })
    .catch((err) => {
      logActivity(
        "-",
        "checkEmailVerified",
        "error",
        `verifying ${email}`
      );
      return res.status(500).json({ message: "Internal server error" });
    });
};
