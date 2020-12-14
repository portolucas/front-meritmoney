import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import UserWelcome from "../userpage/UserWelcome";
import Dashboard from "../dashboard";
import { Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";

const Nav = () => {
  const { logged } = useContext(AuthContext);

  function checkLogged() {
    return (
      <>
        <Route path="/" exact component={logged ? UserWelcome : Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute exact path="/home" component={UserWelcome} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </>
    );
  }

  return checkLogged();
};

export default Nav;
