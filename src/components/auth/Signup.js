import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/Auth";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Link } from "react-router-dom";

import { getAllCharges } from "../../services/charge";
import { getAllSectors } from "../../services/sector";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: "15px 0px 2px 0px",
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const { handle_signup } = useContext(AuthContext);

  const [signData, setSignData] = useState({
    username: "",
    password: "",
    nome: "",
    sobrenome: "",
    cargo: "",
    setor: "",
    cargos: null,
    setores: null,
  });

  const handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function fetchCharges() {
    try {
      const { data } = await getAllCharges();
      setSignData((prevState) => ({ ...prevState, cargos: data }));
    } catch (e) {
      console.log(`error during fetch charges`, e);
    }
  }

  async function fetchSectors() {
    try {
      const { data } = await getAllSectors();
      setSignData((prevState) => ({ ...prevState, setores: data }));
    } catch (e) {
      console.log(`error during fetch sectors`, e);
    }
  }

  async function setDefaultValues() {
    if (!signData.cargo && signData.cargos) {
      console.log("entrou");
      setSignData((prevState) => ({
        ...prevState,
        cargo: signData.cargos[0].id,
      }));
    }

    if (!signData.setor && signData.setores) {
      setSignData((prevState) => ({
        ...prevState,
        setor: signData.setores[0].id,
      }));
    }
  }

  useEffect(() => {
    fetchCharges();
    fetchSectors();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => handle_signup(e, signData)}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  label="username"
                  autoFocus
                  value={signData.username}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={signData.password}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Nome"
                  name="nome"
                  value={signData.nome}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Sobrenome"
                  name="sobrenome"
                  value={signData.sobrenome}
                  onChange={handle_change}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Cargos
                  </InputLabel>
                  <Select
                    value={signData.cargo}
                    onChange={handle_change}
                    label="Cargos"
                    name="cargo"
                  >
                    {signData.cargos &&
                      signData.cargos.map((cargo) => {
                        return (
                          <MenuItem value={cargo.id}>
                            {cargo.descricao}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Setores
                  </InputLabel>
                  <Select
                    name="setor"
                    value={signData.setor}
                    onChange={handle_change}
                    label="Setores"
                  >
                    {signData.setores &&
                      signData.setores.map((setor) => {
                        return (
                          <MenuItem value={setor.id}>
                            {setor.descricao}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={setDefaultValues}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Signup;
