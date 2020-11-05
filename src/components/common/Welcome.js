import React, { useContext } from "react";
import { AuthContext } from "../auth/Auth";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

const Welcome = () => {
  const { loginStatus, logged } = useContext(AuthContext);

  return <h1>{loginStatus === "login" ? "login" : "signup"}</h1>;
};

export default Welcome;