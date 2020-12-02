import React from "react";
import Auth from "./components/auth/Auth";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";
import SnackBar from "./components/common/Snackbar";

const App = () => {
  return (
    <Auth>
      <SnackBar>
        <Header />
        <Nav />
      </SnackBar>
    </Auth>
  );
};
export default App;
