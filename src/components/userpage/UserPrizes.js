import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { getPrizeById } from "../../services/prizes";
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

const UserPrizes = () => {
  const classes = useStyles();
  const { userData } = useContext(AuthContext);
  const [prizes, setPrizes] = useState([]);

  const fetchUserPrizes = async () => {
    let prizes = [];

    if (
      userData &&
      userData.premios.length > 0 &&
      userData.premios.length === 1
    ) {
      try {
        let { data } = await getPrizeById(userData.premios[0]);
        prizes.push(data);
      } catch (e) {
        console.log(`error during fetch prizes api ${e}`);
      }
      setPrizes(prizes);
    }

    if (userData && userData.premios.length > 1) {
      let prizesId = { ...userData.premios };
      for (let prize in prizesId) {
        try {
          let { data } = await getPrizeById(prizesId[prize]);
          prizes.push(data);
        } catch (e) {
          console.log(`error during fetch prizes api ${e}`);
        }
      }
      setPrizes(prizes);
    }
  };

  useEffect(() => {
    fetchUserPrizes();
  }, [userData]);

  return (
    <Grid item xs={6}>
      <h1>Meus prêmios</h1>
      <Paper className={classes.paper}>
        <Card className={classes.cardRoot}>
          <CardContent>
            {prizes &&
              prizes.map((prize) => {
                return (
                  <>
                    <Typography variant="h5" component="h2">
                      {prize.descricao}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      preço: {prize.valor}
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

export default UserPrizes;
