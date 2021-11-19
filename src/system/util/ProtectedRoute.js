import React from "react";
import { Route, Redirect } from "react-router-dom";

const SignInRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? <Redirect to="/dashboard" /> : <Component {...props} />)}
    />
  );
};

const AuthenticatedRoute = ({ component: Component, authenticated, ...rest }) => {
  console.log(authenticated)
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? <Component {...props}/> : <Redirect to="/" />)}
    />
  );
};

export { SignInRoute, AuthenticatedRoute };
