import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { SelectInput, InputCurrency, InputMultiline } from "../common/Inputs";
import { getAllPrizes } from "../../services/prizes";
import { rescuePrize } from "../../services/prizes";

import { useSnackBar } from "../common/Snackbar";

import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  rootIcon: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const UserRescue = () => {
  const classes = useStyles();
  const { userData } = useContext(AuthContext);
  const [prizeOptions, setPrizeOptions] = useState([]);
  const { setSnackBarHttpSuccess } = useSnackBar();
  const { setSnackbarHttpError, setSnackBarHttpWarning } = useSnackBar();

  const [rescue, setRescue] = useState({
    id_colaborador: null,
    id_premio: null,
  });

  const handleChange = (event) => {
    event.persist();
    setRescue((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  async function fetchPrizes() {
    let prizes = [];
    try {
      const { data } = await getAllPrizes();
      data.forEach((prize) => {
        prizes.push({
          value: prize.id,
          text: `${prize.descricao} $ ${prize.valor}`,
          valor: prize.valor,
        });
      });
    } catch (e) {
      console.log(`error during fetch prizes ${e}`);
    }
    setPrizeOptions(prizes);
  }

  useEffect(() => {
    fetchPrizes();
  }, [userData]);

  const handleSubmit = async () => {
    let body = { ...rescue };
    body.id_colaborador = userData.id;
    console.log(body);
    if (body.id_colaborador && body.id_premio) {
      try {
        let { status } = await rescuePrize(body);
        if (status === 200) {
          setSnackBarHttpSuccess("Resgatado com sucesso!");
        }
      } catch (e) {
        if (e.response && e.response.data && e.response.data.error)
          setSnackbarHttpError(e, [e.response.data.error]);
      }
    } else {
      setSnackBarHttpWarning("Preencha todos os campos");
    }
  };

  return (
    <form className={classes.root}>
      <SelectInput
        name="id_premio"
        required={true}
        options={prizeOptions}
        label={"Prêmios"}
        value={rescue.id_premio}
        onChange={handleChange}
      />
      <div className={classes.rootIcon}>
        <IconButton
          onClick={handleSubmit}
          color="primary"
          aria-label="add to shopping cart"
        >
          <GetAppOutlinedIcon size="large" />
        </IconButton>
      </div>
    </form>
  );
};

export default UserRescue;
