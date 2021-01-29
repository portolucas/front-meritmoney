import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export function SelectInput({
  value,
  onChange,
  required,
  options,
  label,
  ...rest
}) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select
          required={required}
          value={value}
          onChange={onChange}
          label={label}
          {...rest}
        >
          {options.map((option) => {
            return <MenuItem value={option.value}>{option.text}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </>
  );
}

export function InputCurrency({ value, onChange, required, label, ...rest }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      label={label}
      variant="outlined"
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      {...rest}
      labelWidth={60}
    />
  );
}

export function InputMultiline({ value, onChange, rowsMax, label, ...rest }) {
  return (
    <TextField
      label={label}
      multiline
      rowsMax={rowsMax}
      value={value}
      onChange={onChange}
      variant="outlined"
      {...rest}
    />
  );
}

export function MaterialUIPickers({ selectedDate, handleDateChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid>
        <KeyboardDatePicker
          disableToolbar={true}
          label="Data"
          name="date"
          format="dd/MM/yyyy"
          value={selectedDate || null}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "Mudar a data",
          }}
          d
          inputVariant="outlined"
          cancelLabel="Cancelar"
          clearLabel="Limpar"
          todayLabel="Hoje"
          okLabel="Confirmar"
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
