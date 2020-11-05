import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Children,
} from "react";
import Nav from "./Nav";
import Login from "./Login";
import Sign from "./Signup";
import "../../App.css";

import { getCurrentUser } from "../../services/auth/currentUser";
import { getToken } from "../../services/auth/getToken";
import { signup } from "../../services/auth/signup";

export const AuthContext = createContext();
const Auth = ({ children }) => {
  const [loginStatus, setloginStatus] = useState("");
  const [logged, setLogged] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [username, setUsername] = useState("");

  async function fetchCurrentUser() {
    const { data } = await getCurrentUser();
    if (data.colaborador) {
      setUsername(data.colaborador[0].nome);
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
  }, []);

  async function fetchToken(body) {
    const { data } = await getToken(body);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.user) {
      setUsername(data.user.username);
    }
    setLogged(true);
    setloginStatus("");
  }

  function handle_login(e, data) {
    e.preventDefault();
    fetchToken(JSON.stringify(data));
  }

  function handle_logout() {
    localStorage.removeItem("token");
    setLogged(false);
    setUsername("");
  }

  async function handle_signup(e, body) {
    e.preventDefault();
    const { data } = await signup(JSON.stringify(body));
    localStorage.setItem("token", data.user.token);
    setLogged(true);
    setloginStatus("");
    setUsername(data.colaborador.nome);
  }

  function form() {
    switch (loginStatus) {
      case "login":
        return <Login handle_login={handle_login} />;
      case "signup":
        return <Sign handle_signup={handle_signup} />;
      default:
        return null;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loginStatus,
        setloginStatus,
        logged,
        setLogged,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
