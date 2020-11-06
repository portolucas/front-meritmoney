import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth/Auth";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { Route } from "react-router-dom";
import { useMount } from "react-use";

const Nav = () => {
  const { logged, userData } = useContext(AuthContext);

  function checkLogged() {
    return (
      <>
        <Route path="/" exact component={!logged ? Login : userData.nome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={"Welcome"} />
      </>
    );
  }

  return checkLogged();
};

export default Nav;
