import React from "react";
import Auth from "./components/auth/Auth";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";

const App = () => {
  return (
    <Auth>
      <Header />
      <Nav />
    </Auth>
  );
};
export default App;
