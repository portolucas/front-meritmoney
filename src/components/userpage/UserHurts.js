import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { listHurtsByColaborator } from "../../services/hurts";
import { AuthContext } from "../auth/Auth";

import hurtsCardCover from "../../static/images/hurts-card-cover.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  pos: {
    marginBottom: 12,
  },
}));

const UserHurts = () => {
  const classes = useStyles();
  const { userData, logged } = useContext(AuthContext);
  const [realizedHurts, setRealizedHurts] = useState([]);
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
    <>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.pos} variant={"h3"}>
              Minhas doações
            </Typography>
            {realizedHurts &&
              realizedHurts.map((hurts) => {
                return (
                  <div className={classes.pos}>
                    <Typography color="textSecondary">
                      mc$ {hurts.valor} enviada para
                      <Typography color="textSecondary">
                        {hurts.nome_destinatario}
                      </Typography>
                    </Typography>
                    <Typography variant="body1">
                      dia{" "}
                      {moment(hurts.data_transacao)
                        .local()
                        .format("DD/MM/YYYY")}
                    </Typography>
                  </div>
                );
              })}
            {rogerHurts &&
              rogerHurts.map((hurts) => {
                return (
                  <div className={classes.pos}>
                    <Typography color="textSecondary">
                      mc$ {hurts.valor} recebida de
                    </Typography>
                    <Typography color="textSecondary">
                      {hurts.nome_remetente}
                    </Typography>
                    <Typography variant="body1">
                      dia{" "}
                      {moment(hurts.data_transacao)
                        .local()
                        .format("DD/MM/YYYY")}
                    </Typography>
                  </div>
                );
              })}
          </CardContent>
        </div>
        <CardMedia
          component="img"
          alt="Prêmios resgatados"
          className={classes.cover}
          image={hurtsCardCover}
        />
      </Card>
    </>
  );
};

export default UserHurts;
