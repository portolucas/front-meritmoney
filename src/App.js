import React from "react";
import Auth from "./components/auth/Auth";
import Header from "./components/common/Header";
import Welcome from "./components/common/Welcome";

const App = () => {
  return (
    <Auth>
      <Header />
      <Welcome />
    </Auth>
  );
};
export default App;
