import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // REDUX
  // ~ access redux state
  const { firebaseAuth } = useSelector((state) => state.auth);
  console.log(firebaseAuth);

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
