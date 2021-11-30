import React from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  // REDUX
  // ~ access redux state
  const { firebaseAuth } = useSelector((state) => state.auth);
  console.log(firebaseAuth);

  return (
    <>
      <p>Dashboard still under development, please wait for further notice.</p>
      <p>sofgkkdjogja@gmail.com</p>
    </>
  );
}
