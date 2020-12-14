import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { SelectInput, MaterialUIPickers } from "../common/Inputs";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    maxWidth: "100%",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      marginTop: "0!important",
      marginLeft: "0!important",
    },
  },
  filterBar: {
    paddingBottom: 10,
  },
  clearFilters: {
    marginTop: "0.5em",
    marginBottom: 8,
  },
}));

const DashboardFilterToolbar = ({ colaboratorsOptions, params, setParams, fetch, fetchAllTransactions }) => {
  const classes = useStyles();
  const handleDateChange = (date) => {
    setParams((oldValues) => ({
      ...oldValues,
      date: date,
    }));
  };

  const clearFilters = () => {
    setParams({})
    fetchAllTransactions();
  };

  function Remetente() {
    return (
      <div className={classes.filterBar}>
        <form className={classes.form}>
          <SelectInput
            value={params.remetente}
            label={"Remetente"}
            name={"remetente"}
            id="remetente"
            required={false}
            onChange={(event) => {
              setParams((oldValues) => ({
                ...oldValues,
                [event.target.name]: event.target.value,
              }));
            }}
            options={colaboratorsOptions}
          />
        </form>
      </div>
    );
  }
  function Destinatario() {
    return (
      <div className={classes.filterBar}>
        <form className={classes.form}>
          <SelectInput
            value={params.destinatario}
            label={"Destinatário"}
            name={"destinatario"}
            id="destinatario"
            required={false}
            onChange={(event) => {
              setParams((oldValues) => ({
                ...oldValues,
                [event.target.name]: event.target.value,
              }));
            }}
            options={colaboratorsOptions}
          />
        </form>
      </div>
    );
  }

  function DatePicker() {
    return (
      <div className={classes.filterBar}>
        <form className={classes.form}>
          <MaterialUIPickers
            selectedDate={params.date}
            handleDateChange={(date) => {
              handleDateChange(date);
            }}
          />
        </form>
      </div>
    );
  }

  function ClearFilter() {
    return (
      <div className={classes.clearFilters}>
        {" "}
        <Button variant="outlined" onClick={clearFilters}>
          Limpar filtros
        </Button>
      </div>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={4} md={3}>
        <Remetente />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Destinatario />
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <DatePicker />
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <ClearFilter />
      </Grid>
    </Grid>
  );
};

export default DashboardFilterToolbar;
