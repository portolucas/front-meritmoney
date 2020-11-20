import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import UserWelcome from "../userpage/UserWelcome"
import { Route } from "react-router-dom";

const Nav = () => {
  const { logged } = useContext(AuthContext);

  function checkLogged() {
    return (
      <>
        <Route path="/" exact component={!logged ? Login : UserWelcome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserWelcome} />
      </>
    );
  }

  return checkLogged();
};

export default Nav;
