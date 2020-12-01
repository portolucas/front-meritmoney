import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import prizeCardCover from "../../static/images/prize-card-cover.svg";

import { getPrizeById } from "../../services/prizes";
import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
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
    <>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography className={classes.pos} variant={"h3"}>
              Prêmios resgatados
            </Typography>
            {prizes &&
              prizes.map((prize) => {
                return (
                  <>
                    <Typography variant="body1" component="h2">
                      {prize.descricao}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      por mc$ {prize.valor}
                    </Typography>
                  </>
                );
              })}
          </CardContent>
        </div>
        <CardMedia
          component="img"
          alt="Prêmios resgatados"
          className={classes.cover}
          image={prizeCardCover}
        />
      </Card>
    </>
  );
};

export default UserPrizes;
