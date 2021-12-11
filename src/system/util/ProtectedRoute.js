import React from "react";
import { Route, Navigate } from "react-router-dom";

const SignInRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? <Navigate to="/dashboard" /> : <Component {...props} />)}
    />
  );
};

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => {
  console.log(authenticated)
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? <Component {...props}/> : <Navigate to="/" />)}
    />
  );
};

export { SignInRoute, AuthenticatedRoute };
