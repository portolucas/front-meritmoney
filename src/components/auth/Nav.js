import React from "react";

const Nav = ({ display_form, handle_logout, logged }) => {
  const logged_out_nav = (
    <ul>
      <li onClick={() => display_form("login")}>login</li>
      <li onClick={() => display_form("signup")}>signup</li>
    </ul>
  );

  const logged_nav = (
    <ul>
      <li onClick={handle_logout}>logout</li>
    </ul>
  );
  return <div>{logged ? logged_nav : logged_out_nav}</div>;
};

export default Nav;
