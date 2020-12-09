import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import UserWelcome from "../userpage/UserWelcome";
import Dashboard from "../userpage/Dashboard";
import { Route } from "react-router-dom";

const Nav = () => {
  //const { logged } = useContext(AuthContext);

  function checkLogged() {
    return (
      <>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserWelcome} />
        <Route path="/dashboard" component={Dashboard} />
      </>
    );
  }

  return checkLogged();
};

export default Nav;
