import React from "react";
import Auth from "./components/auth/Auth";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";
import SnackBar from "./components/common/Snackbar";
import StickyFooter from "./components/common/Footer";

const App = () => {
  return (
    <Auth>
      <SnackBar>
        <Header />
        <Nav />
      </SnackBar>
      <StickyFooter />
    </Auth>
  );
};
export default App;
