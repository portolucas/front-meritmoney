import React, { useContext, useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { listHurtsByColaborator } from "../../services/hurts";
import { AuthContext } from "../auth/Auth";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import hurtsCardCover from "../../static/images/hurts-card-cover.svg";

const UserHurts = () => {
  const { userData, logged } = useContext(AuthContext);
  const [realizedHurts, setRealizedHurts] = useState([]);
  const [rogerHurts, setRogerHurts] = useState([]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      maxWidth: "100%",
      maxHeight: "500px",
    },
    rootAvatar: {
      display: "flex",
      justifyContent: "left",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: realizedHurts.length > 10 ? "auto" : "1 0 auto",
      overflowX: realizedHurts.length > 10 ? "auto" : "hidden",
    },
    pos: {
      marginBottom: 12,
      padding: 15
    },
    "@global": {
      "*::-webkit-scrollbar": {
        width: "3px",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(124,185,199,0.7)",
        borderRadius: "2px",
      },
      "*:hover": {
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(124,185,199,0.5)",
          transitionDuration: "1s",
        },
      },
    },
  }));

  const classes = useStyles();

  const fetchColaboratorHurts = useCallback(async () => {
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
  }, [logged, userData]);

  useEffect(() => {
    fetchColaboratorHurts();
  }, [userData, fetchColaboratorHurts]);

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.details}>
          <Typography className={classes.pos} variant={"h3"}>
            Minhas doações
          </Typography>
          <CardContent className={classes.content}>
            {realizedHurts &&
              realizedHurts.map((hurts) => {
                return (
                  <div className={classes.rootAvatar}>
                    <Chip
                      avatar={
                        <Avatar>{hurts.nome_destinatario.slice(0, 1)}</Avatar>
                      }
                      label={`$mc$${hurts.valor} enviada para ${hurts.nome_destinatario}`}
                      //onClick={handleClick}
                      //onDelete={handleDelete}
                      variant="outlined"
                      color="primary"
                    />
                  </div>
                );
              })}
            {rogerHurts &&
              rogerHurts.map((hurts) => {
                return (
                  <div className={classes.rootAvatar}>
                    <Chip
                      avatar={
                        <Avatar>{hurts.nome_remetente.slice(0, 1)}</Avatar>
                      }
                      label={`$mc$${hurts.valor} recebido de ${hurts.nome_remetente}`}
                      //onClick={handleClick}
                      //onDelete={handleDelete}
                      variant="outlined"
                      color="primary"
                    />
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
