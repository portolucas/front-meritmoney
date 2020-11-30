import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { listHurtsByColaborator } from "../../services/hurts";
import { AuthContext } from "../auth/Auth";


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
}));

const UserHurts = () => {
  const classes = useStyles();
  const { userData, logged } = useContext(AuthContext);
  const [realizedHurts, setRealizedHurts] = useState([])
  const [rogerHurts, setRogerHurts] = useState([]);

  const fetchColaboratorHurts = async () => {
    let hurts;
    if (logged && userData) {
      try {
        let { data } = await listHurtsByColaborator(userData.id);
        hurts = data;
      } catch (e) {
        console.log(`error during fetch hurts api ${e}`);
      }
      setRealizedHurts(hurts.realizadas);
      setRogerHurts(hurts.recebidas);
    }
  };

  useEffect(() => {
    fetchColaboratorHurts();
  }, [userData]);

  return (
    <Grid item xs={6}>
      <h1>Minhas doações</h1>
      <Paper className={classes.paper}>
        <Card className={classes.cardRoot}>
          <CardContent>
            {realizedHurts &&
              realizedHurts.map((hurts) => {
                return (
                  <>
                    <Typography lassName={classes.pos} color="textSecondary">
                      Realizada
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {moment(hurts.data_transacao)
                        .local()
                        .format("DD/MM/YYYY")}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      preço: {hurts.valor}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Destinatário: {hurts.nome_destinatario}
                    </Typography>
                  </>
                );
              })}
            {rogerHurts &&
              rogerHurts.map((hurts) => {
                return (
                  <>
                    <Typography lassName={classes.pos} color="textSecondary">
                      Recebida
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {moment(hurts.data_transacao)
                        .local()
                        .format("DD/MM/YYYY")}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      preço: {hurts.valor}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Remetente: {hurts.nome_remetente}
                    </Typography>
                  </>
                );
              })}
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
};

export default UserHurts;
