import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import SimpleAccordion from "../common/Accordion";

import UserPrizes from "./UserPrizes";
import UserHurts from "./UserHurts";
import UserRescue from "./UserRescue";
import StickyFooter from "../common/Footer";

import { AuthContext } from "../auth/Auth";
import UserDonate from "./UserDonate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },

  cardRoot: {
    minWidth: 275,
    padding: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const UserWelcome = () => {
  const classes = useStyles();
  const { userData } = useContext(AuthContext);

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <SimpleAccordion title={"Resgatar"}>
              <UserRescue />
            </SimpleAccordion>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SimpleAccordion title={"Doar"}>
              <UserDonate />
            </SimpleAccordion>
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserPrizes />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UserHurts />
          </Grid>
        </Grid>
      </div>
      <StickyFooter />
    </>
  );
};

export default UserWelcome;
