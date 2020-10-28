import React from "react";
import PropTypes from "prop-types";
import { getAllCharges } from "../services/charge";
import { getAllSectors } from "../services/sector";

class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    nome: "",
    sobrenome: "",
    cargo: "",
    setor: "",
    cargos: null,
    setores: null,
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  setDefaultValues = () => {
    if (!this.state.cargo) {
      this.setState({ cargo: this.state.cargos[0].id });
    }

    if (!this.state.setor) {
      this.setState({ setor: this.state.setores[0].id });
    }
  };

  componentWillMount() {
    getAllCharges().then((res) => this.setState({ cargos: res.data }));
    getAllSectors().then((res) => this.setState({ setores: res.data }));
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.handle_signup(e, this.state)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          name="nome"
          value={this.state.nome}
          onChange={this.handle_change}
        />
        <label htmlFor="sobrenome">Sobrenome</label>
        <input
          type="text"
          name="sobrenome"
          value={this.state.sobrenome}
          onChange={this.handle_change}
        />
        <label htmlFor="cargos">Cargos</label>
        <select
          name="cargo"
          value={this.state.cargos && this.state.cargos[0]}
          onChange={this.handle_change}
        >
          {this.state.cargos &&
            this.state.cargos.map((c) => {
              return <option value={c.id}>{c.descricao}</option>;
            })}
        </select>
        <label htmlFor="cargos">Setores</label>
        <select name="setor" onChange={this.handle_change}>
          {this.state.setores &&
            this.state.setores.map((s) => {
              return <option value={s.id}>{s.descricao}</option>;
            })}
        </select>

        <input type="submit" onClick={this.setDefaultValues} />
      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired,
};
