import React from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getCurrentTime } from "system/util/method";

export default function Dashboard(props) {
  // User Credential and Authentication Status from localStorage
  let authenticationStatus = localStorage.getItem("authenticationStatus");
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

  // function createCourse(event) {
  //   event.preventDefault();
  //   if (decodedFirebaseUserCredential.role !== "SystemAdministrator" || authenticationStatus === false) {
  //     console.log("forbidden, user not having necessary permissions");
  //     return;
  //   }

  //   const payloadData = {
  //     timeStamp: getCurrentTime(),
  //     method: "createCourse",
  //     userID: decodedFirebaseUserCredential.user_id,
  //     data: {
  //       tsof0: {
  //         courseName: "Murid Kristus",
  //         courseLevel: 0,
  //       },
  //       tsof1: {
  //         courseName: "Pekerja Kristus",
  //         courseLevel: 1,
  //       },
  //       tsof2: {
  //         courseName: "Hamba Kristus",
  //         courseLevel: 2,
  //       },
  //     },
  //   };
  //   const encodedPayloadData = {
  //     token: jwt.sign(payloadData, process.env.REACT_APP_JWT_KEY, { algorithm: "HS256" }),
  //   };

  //   axios
  //     .post("/create-course", encodedPayloadData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((result) => {
  //       console.log("execute create course: ", result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response)
  //     });
  // }

  // function createClass(event) {
  //   event.preventDefault();
  // }

  // ~
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
        {/* <div style={{ margin: "5px" }}>
          <button onClick={createCourse}>create course</button>
        </div>
        <div style={{ margin: "5px" }}>
          <button onClick={createClass}>create class</button>
        </div> */}
      </div>
    </>
  );
}
