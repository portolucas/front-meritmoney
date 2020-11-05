import React, { useState, useCallback } from "react";

const Login = ({ handle_login }) => {
  const [userData, setUserData] = useState({ username: "", password: "" });

  const handle_change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={(e) => handle_login(e, userData)}>
      <h4>Log In</h4>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={(e) => {
          handle_change(e);
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={(e) => {
          handle_change(e);
        }}
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
