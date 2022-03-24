import jwt from "jsonwebtoken";

const algorithm = { algorithm: "HS256" };
const privateKeyJWT = process.env.REACT_APP_JWT_KEY;

function jwtEncodeUtil(payloadData) {
  return jwt.sign(payloadData, privateKeyJWT, algorithm);
}

function jwtDecodeUtil(payloadData) {
  return jwt.verify(payloadData, privateKeyJWT, algorithm);
}

export { jwtEncodeUtil, jwtDecodeUtil };
