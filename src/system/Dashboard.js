import React from "react";
import jwt from "jsonwebtoken";

export default function Dashboard(props) {
  // User Credential and Authentication Status from localStorage
  let encryptedUserCredential = localStorage.getItem("firebaseUserCredential");
  let decodedFirebaseUserCredential;
  try {
    decodedFirebaseUserCredential = jwt.verify(encryptedUserCredential, process.env.REACT_APP_JWT_KEY, {
      algorithms: "HS256",
    });
  } catch (err) {
    localStorage.removeItem("firebaseUserCredential");
    localStorage.setItem("authenticationStatus", false);
    props.history.push("/");
  }

  console.log(decodedFirebaseUserCredential);

  function signOutButton(event) {
    event.preventDefault();
    localStorage.removeItem("firebaseUserCredential");
    localStorage.setItem("authenticationStatus", false);
    window.location.reload();
  }

  return (
    <>
      <div
        style={{
          marginTop: "100px",
          marginBottom: "100px",
          marginRight: "150px",
          marginLeft: "80px",
        }}
      >
        <h3>Welcome {decodedFirebaseUserCredential.name}!</h3>
        <p>The dashboard is still under development.</p>
        <p>
          Your account has been successfully registered with <br /> ID: <b>{decodedFirebaseUserCredential.user_id}</b>{" "}
          using <br />
          email <b>{decodedFirebaseUserCredential.email}</b>
        </p>
        <p>please wait for further notice, Thankyou </p>
        <p>
          Reizkian Yesaya .R <br />
          Software Engineer
          <br />
          -------------------------------------------------
          <br /> The School of Fire
        </p>

        <div style={{ margin: "5px" }}>
          <button onClick={signOutButton}>sign out</button>
        </div>
      </div>
    </>
  );
}
