import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../auth/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { logged } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return logged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
