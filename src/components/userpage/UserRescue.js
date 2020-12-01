import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { SelectInput, InputCurrency, InputMultiline } from "../common/Inputs";
import { getAllPrizes } from "../../services/prizes";
import { rescuePrize } from "../../services/prizes";

import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const UserRescue = () => {
  const classes = useStyles();
  const { userData } = useContext(AuthContext);
  const [prizeOptions, setPrizeOptions] = useState([]);
  //const [error, setError] = useState("");
  //const [helperText, setHelperText] = useState("");

  const [rescue, setRescue] = useState({
    id_colaborador: null,
    id_premio: null,
  });

  const handleChange = (event) => {
    event.persist();
    console.log(event);
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

{/*  const validateCurrency = async () => {
    if (rescue.valor_premio > userData.saldo_acumulado) {
      setError(true);
      setHelperText("Saldo insuficiente");
    } else {
      setError(false);
      setHelperText("Digite um valor inteiro");
    }
  }; 

  useEffect(() => {
    validateCurrency();
  }, [rescue.valor_premio]);
*/}

  const handleSubmit = async () => {
    let body = { ...rescue };
    body.id_colaborador = userData.id;
    if (body.id_colaborador && body.id_premio) {
      try {
        let { status } = await rescuePrize(body);
        if (status === 200) {
          setRescue((oldValues) => ({
            ...oldValues,
            id_colaborador: null,
            id_premio: null,
          }));
        }
      } catch (e) {
        console.log(`error during fetch rescue prize api ${e}`);
      }
    } else {
      console.log(body);
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
        //error={error}
        // helperText={helperText}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Enviar
      </Button>
    </form>
  );
};

export default UserRescue;
