import React, { useContext, useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import prizeCardCover from "../../static/images/prize-card-cover.svg";

import { getPrizeById } from "../../services/prizes";
import { AuthContext } from "../auth/Auth";

import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const UserPrizes = () => {
  const { userData } = useContext(AuthContext);
  const [prizes, setPrizes] = useState([]);

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
      flex: prizes.length > 10 ? "auto" : "1 0 auto",
      overflowX: prizes.length > 10 ? "auto" : "hidden",
    },
    pos: {
      marginBottom: 12,
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

  const fetchUserPrizes = useCallback(async () => {
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
  }, [userData]);

  useEffect(() => {
    fetchUserPrizes();
  }, [userData, fetchUserPrizes]);

  return (
    <>
      <Card className={classes.root}>
        <div className={classes.details}>
          <Typography className={classes.pos} variant={"h3"}>
            Prêmios resgatados
          </Typography>
          <CardContent className={classes.content}>
            {prizes &&
              prizes.map((prize) => {
                return (
                  <div className={classes.rootAvatar}>
                    <Chip
                      icon={<FaceIcon />}
                      label={`${prize.descricao} por mc$${prize.valor}`}
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
          image={prizeCardCover}
        />
      </Card>
    </>
  );
};

export default UserPrizes;
