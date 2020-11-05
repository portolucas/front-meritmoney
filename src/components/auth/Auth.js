import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Login from "./Login";
import Sign from "./Signup";
import "../../App.css";

const Auth = () => {
  const [displayed_form, setDisplayed_form] = useState("");
  const [logged_in, setLogged_in] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (logged_in) {
      try {
        fetch("http://localhost:8000/webapi/current_user/", {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.colaborador) {
              setUsername(json.colaborador[0].nome);
            }
          });
      } catch (e) {
        console.log(`error in current user`, e);
      }
    }
  }, []);

  function handle_login(e, data) {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        setLogged_in(true);
        setDisplayed_form("");
        setUsername(json.colaborador.nome);
      });
  }

  function handle_logout() {
    localStorage.removeItem("token");
    setLogged_in(false);
    setUsername("");
  }

  function handle_signup(e, data) {
    e.preventDefault();
    fetch("http://localhost:8000/webapi/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        localStorage.setItem("token", json.user.token);
        setLogged_in(true);
        setDisplayed_form("");
        setUsername(json.colaborador.nome);
      });
  }

  function form() {
    switch (displayed_form) {
      case "login":
        return <Login handle_login={handle_login} />;
      case "signup":
        return <Sign handle_signup={handle_signup} />;
      default:
        return null;
    }
  }

  return (
    <div className={"App"}>
      <Nav
        logged_in={logged_in}
        display_form={setDisplayed_form}
        handle_logout={handle_logout}
      />
      {form()}
      <h3>{logged_in ? `Hello, ${username}` : "Please Log In"}</h3>
    </div>
  );
};

export default Auth;
