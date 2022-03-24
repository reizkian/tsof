const admin = require("firebase-admin");
const firebase = require("firebase");
const functions = require("firebase-functions");
require("firebase/storage");
const operatingSystem = require("os");

const firebaseConfig = {
  apiKey: functions.config().tsof.project_api_key,
  authDomain: "the-school-of-fire.firebaseapp.com",
  databaseURL: "https://the-school-of-fire.firebaseio.com/",
  projectId: "the-school-of-fire",
  storageBucket: "the-school-of-fire.appspot.com",
  messagingSenderId: "724925511029",
  appId: "1:724925511029:web:2bf4e2cd8274dd11da0f3c",
  measurementId: "G-TDYDZNVX0N",
};

/* F I R E B A S E */
firebase.initializeApp(firebaseConfig);
var firebaseAuthentication = firebase.auth();
var firebaseDatabase = firebase.database();
var firebaseStorage = firebase.storage()


//  emulators
var useEmulators = false;
if (operatingSystem.hostname() === "AMD64") {
  useEmulators = true;
  firebaseAuthentication.useEmulator("http://localhost:9099");
  firebaseDatabase.useEmulator("localhost", 9000);
}

/* A P I - K E Y */
const privateKeyJWT = functions.config().tsof.jwt_key;
const googleMapApiKey = functions.config().tsof.gmap_api_key;

module.exports = {
  admin,
  firebaseDatabase,
  firebaseAuthentication,
  firebaseStorage,
  useEmulators,
  privateKeyJWT,
  googleMapApiKey,
};
