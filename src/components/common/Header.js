import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import Popover from "@material-ui/core/Popover";

import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowX: 'none'
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
  rootAvatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  typography: {
    padding: theme.spacing(1),
  },
}));

const Header = () => {
  const classes = useStyles();
  const { userData, logged, username, handle_logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              Merit Money
            </Link>
          </Typography>
          {logged && (
            <Button
              color="inherit"
              className={classes.link}
              onClick={handle_logout}
            >
              <Link className={classes.link} to="/">
                Logout
              </Link>
            </Button>
          )}
          {logged ? (
            <div className={classes.rootAvatar}>
              <Button>
                <Avatar onClick={handleClick} className={classes.orange}>
                  {username.slice(0, 1)}
                </Avatar>
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.typography}>
                  mc${userData.saldo_recebido} para resgatar
                </Typography>
                <Typography className={classes.typography}>
                  mc${userData.saldo_acumulado} para doar
                </Typography>
              </Popover>
            </div>
          ) : (
            <Button>
              <Link className={classes.link} to="/login">
                Login
              </Link>
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
