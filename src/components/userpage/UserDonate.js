import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import { SelectInput, InputCurrency, InputMultiline } from "../common/Inputs";
import { getAllColaborators } from "../../services/colaborator";
import { sendCoins } from "../../services/sendCoins";

import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const UserDonate = () => {
  const classes = useStyles();
  const { userData } = useContext(AuthContext);
  const [colaboratorsOptions, setColaboratorOptions] = useState([]);
  const [error, setError] = useState("");
  const [helperText, setHelperText] = useState("");

  const [donate, setDonate] = useState({
    id_remetente: null,
    id_destinatario: null,
    valor: null,
    justificativa: null,
  });

  console.log(donate);

  const handleChange = (event) => {
    event.persist();
    setDonate((oldValues) => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  async function fetchColaborators() {
    let colaborators = [];
    try {
      const { data } = await getAllColaborators();
      data.forEach((colaborator) => {
        colaborators.push({ value: colaborator.id, text: colaborator.nome });
      });
    } catch (e) {
      console.log(`error during fetch colaborators ${e}`);
    }
    setColaboratorOptions(colaborators);
  }

  useEffect(() => {
    fetchColaborators();
  }, [userData]);

  const validateCurrency = async () => {
    if (donate.valor > userData.saldo_acumulado) {
      setError(true);
      setHelperText("Saldo insuficiente");
    } else {
      setError(false);
      setHelperText("Digite um valor inteiro");
    }
  };

  useEffect(() => {
    validateCurrency();
  }, [donate.valor]);

  const handleSubmit = async () => {
    let body = { ...donate };
    body.id_remetente = userData.id;
    body.valor = parseInt(donate.valor);

    if (
      body.id_remetente &&
      body.id_destinatario &&
      body.id_destinatario !== donate.id_remetente &&
      body.valor &&
      body.justificativa
    ) {
      try {
        let { status } = await sendCoins(body);
        if (status === 200) {
          setDonate((oldValues) => ({
            ...oldValues,
            id_remetente: null,
            id_destinatario: null,
            valor: null,
            justificativa: null,
          }));
        }
      } catch (e) {
        console.log(`error during fetch sendCoins api ${e}`);
      }
    } else {
      console.log(body);
    }
  };

  return (
    <form className={classes.root}>
      <SelectInput
        name="id_destinatario"
        required={true}
        options={colaboratorsOptions}
        label={"Destinatário"}
        value={donate.id_destinatario}
        onChange={handleChange}
      />
      <InputCurrency
        name="valor"
        required={true}
        label={"Valor"}
        value={donate.valor}
        onChange={handleChange}
        error={error}
        helperText={helperText}
      />
      <InputMultiline
        name="justificativa"
        value={donate.justificativa}
        onChange={handleChange}
        rowsMax={5}
        label="Justificativa"
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

export default UserDonate;
