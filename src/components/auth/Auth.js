import React, { useState, useEffect, createContext } from "react";
import "../../App.css";

import { getCurrentUser } from "../../services/auth/currentUser";
import { getToken } from "../../services/auth/getToken";
import { signup } from "../../services/auth/signup";

export const AuthContext = createContext();
const Auth = ({ children }) => {
  const [logged, setLogged] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [username, setUsername] = useState("");
  const [userData, setUserdata] = useState("");

  async function fetchCurrentUser() {
    try {
      if (logged) {
        const { data } = await getCurrentUser();
        if (data.colaborador) {
          setUsername(data.colaborador.nome);
          setUserdata(data.colaborador);
        }
      }
    } catch (e) {
      console.log("error during fetch current user", e);
    }
  }

  useEffect(() => {
    if (logged) {
      try {
        fetchCurrentUser();
      } catch (e) {
        console.log(`error in current user`, e);
      }
    }
  }, [logged]);

  async function fetchToken(e, body) {
    e.preventDefault();
    try {
      await getToken(body).then((res) =>
        localStorage.setItem("token", res.data.token)
      );
      setLogged(true);
      window.location.reload();
      window.location.pathname = "/home";
    } catch (e) {
      console.log("error during fetch token", e);
    }
  }

  async function handle_login(e, data) {
    e.preventDefault();
    try {
      fetchToken(e, JSON.stringify(data));
    } catch (e) {
      console.log("error during login", e);
    }
  }

  function handle_logout() {
    try {
      localStorage.removeItem("token");
      setLogged(false);
      setUsername("");
    } catch (e) {
      console.log("error during logout", e);
    }
  }

  async function handle_signup(e, body) {
    e.preventDefault();
    try {
      const { data } = await signup(JSON.stringify(body));
      localStorage.setItem("token", data.user.token);
      setLogged(true);
      setUsername(data.colaborador.nome);
      window.location.reload();
      window.location.pathname = "/home";
    } catch (e) {
      console.log("error during signup", e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logged,
        setLogged,
        username,
        setUsername,
        handle_login,
        userData,
        handle_logout,
        handle_signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
