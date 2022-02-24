import React from "react";
import { Route, Navigate } from "react-router-dom";

const SignInRoute = ({ element: Element, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? <Navigate to="/dashboard/home" /> : <Element {...props} />)}
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
