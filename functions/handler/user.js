const firebase = require("firebase");
const config = require("../util/config");
const {realTimeDataBase } = require("../util/admin")
const jsonWebToken = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const {getCurrentTime} = require("../util/method")

firebase.initializeApp(config);

exports.login = function (req, res) {
  /*
    take user email and password, pass it to firebase authentication
  */

	const user = {
		email: req.body.email.trim(),
		password: req.body.password.trim(),
	};
  
  // ~ error handling
  let errors = {};
  if( user.email === "" ){ errors.email = "email cannot be empty"}
  if ( user.password === ""){ errors.email = "password cannot be empty"}

  // ~ firebase authentication
	firebase.auth().signInWithEmailAndPassword(user.email, user.password)
		.then(userCredentials => {
      // ~ return id token
      return userCredentials.user.getIdToken();
		})
    .then( token => {
      // ~ decode token, then get user ID
      req.decodedToken = jwtDecode(token)
      const userID = req.decodedToken.user_id
      return userID
    })
    .then( userID =>{
      // ~ update _authentication login timestamp
      realTimeDataBase.ref("users/" + userID +"/_authentication/login").set(getCurrentTime())
      // ~ check and get user role from realtime database
      console.log(userID)
      return realTimeDataBase.ref("users/" + userID).child("role").get()
      .then( role => {
        var token
        // ~ assign role to authentication token if user has role
        req.decodedToken.role = role.val()
        token = req.decodedToken
        console.log(token)
        token = jsonWebToken.sign({token}, "sof")
        return res.json({token})
      })
    })
    .catch(err=>{
      return res.status(500).json({General: "user and password not found"})
    })

  /*
    TO DO:
      [v] firebase authentication
      [ ] save last login time stamp    
  */
};



exports.signup = function (req, res){
  /*
    take user personal data, then create user by firebase authentication,
    then write personal data to realtime database
  */

  const user = {
    email: req.body.email.trim(),
    password: req.body.password.trim(),
    confirmPassword: req.body.confirmPassword.trim(),
    name: req.body.name.trim(),
    birthDate: req.body.birthDate.trim()
  }
  
  // ~ error handling
  let errors = {}
  if ( user.email === "" ){ errors.email = "email cannot be empty"}
  if ( user.password === "" ){ errors.password = "password cannot be empty"}
  if ( user.confirmPassword === "" ){ errors.confirmPassword = "confirm password cannot be empty"}
  if ( user.name === "" ){ errors.name = "name cannot be empty"}
  if ( user.birthDate === "" ){ errors.birthDate = "birth date cannot be empty"}
  if ( user.confirmPassword !== user.password ) {
    errors.password = "confirm password is not the same as password"
    errors.confirmPassword = "confirm password is not the same as password"
  }
  
  if(Object.keys(errors).length > 0){
    // ~ if any errors catched repond with errors message
    res.status(400).json({error:errors})
  }else{
    // ~ else proceede to create user
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredentials => {
        let userID = userCredentials.user.uid
        // ~ add user object
        user._id = userID
        user._authentication = {
          login: getCurrentTime(),
          created: getCurrentTime()
        }

        return user
      })
      .then(user=>{
        req.user = user
        // ~ delete password and confirm password
        delete user.password
        delete user.confirmPassword
        // ~ write user personal data to database
        realTimeDataBase.ref("users/"+user._id).set(user)
        .then(()=>{
          return res.status(201).json({ message: `user signed up successfully`, _id: req.user._id});
        })
        .catch(err =>{
          return res.status(500).json({ error: err});
        });
      })
      .catch(err =>{
        return res.status(500).json({ error: err});
      });
  }

  /*
    TO DO:
    [v] create user using firebase authentication
    [v] design data structure
    [v] consult what data need to be collected
    ---------------------------------------------
{
  "email": "testuser1@gmail.com",
  "password": "test123",
  "confirmPassword": "test123",
  "name": "Test User 1",
  "birthDate": "01-01-2000"
}
  */
}