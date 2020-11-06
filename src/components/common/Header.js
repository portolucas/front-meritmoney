import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white!important",
    textDecoration: "none!important",
  },
}));

const Header = () => {
  const classes = useStyles();
  const { logged, username, handle_logout } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              Merit Money
            </Link>
          </Typography>
          <Button color="inherit">
            {logged ? (
              username
            ) : (
              <Link className={classes.link} to="/login">
                Login
              </Link>
            )}
          </Button>
          {logged && (
            <Button
              color="inherit"
              className={classes.link}
              onClick={handle_logout}
            >
              <Link className={classes.link} to="/">Logout</Link>
            </Button>
          )}
          {!logged && (
            <Button color="inherit">
              <Link className={classes.link} to="/signup">
                Signup
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
