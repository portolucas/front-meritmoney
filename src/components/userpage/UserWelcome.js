import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { getPrizeById } from "../../services/prizes";
import { listHurtsByColaborator } from "../../services/hurts";

import SimpleAccordion from "../common/Accordion";

import UserPrizes from "./UserPrizes";
import UserHurts from "./UserHurts";
import UserRescue from "./UserRescue";

import { AuthContext } from "../auth/Auth";
import UserDonate from "./UserDonate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant={"h1"}>Bem-vindo, {userData.nome}</Typography>{" "}
            <Typography variant={"subtitle1"}>
              O seu saldo para resgatar prêmios é mc${userData.saldo_recebido}
            </Typography>
            <Typography variant={"subtitle1"}>
              O seu saldo para presentear os seus amigos é mc$
              {userData.saldo_acumulado}{" "}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserPrizes />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserHurts />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleAccordion title={"Doar"}>
            <UserDonate />
          </SimpleAccordion>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleAccordion title={"Resgatar"}>
            <UserRescue />
          </SimpleAccordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserWelcome;
