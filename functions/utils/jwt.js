const jwt = require("jsonwebtoken");
const jwt_decode_64URL = require("jwt-decode")
const algorithm = { algorithm: "HS256" };
const { privateKeyJWT } = require("./admin");

// Encode to protect data
exports.jwtEncodeUtil = function(payloadData) {
  return jwt.sign(payloadData, privateKeyJWT, algorithm);
};

exports.jwtEncodeAPI = function(req, res) {
  return res.status(200).json({token:jwt.sign(req.body, privateKeyJWT, algorithm)});
};

// Decode to get data
exports.jwtDecodeUtil = function(payloadData) {
  return jwt.verify(payloadData, privateKeyJWT, algorithm);
};

exports.jwtDecodeAPI = function(req, res) {
  return res.status(200).json(jwt.verify(req.body.token, privateKeyJWT, algorithm));
};

exports.jwtDecodeFirebase = function(payloadData){
  return jwt_decode_64URL(payloadData)
}