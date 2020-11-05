import React, { useState, useEffect } from "react";
import { getAllCharges } from "../../services/charge";
import { getAllSectors } from "../../services/sector";

const Signup = ({ handle_signup }) => {
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
    <form onSubmit={(e) => handle_signup(e, signData)}>
      <h4>Sign Up</h4>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={signData.username}
        onChange={handle_change}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={signData.password}
        onChange={handle_change}
      />
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        name="nome"
        value={signData.nome}
        onChange={handle_change}
      />
      <label htmlFor="sobrenome">Sobrenome</label>
      <input
        type="text"
        name="sobrenome"
        value={signData.sobrenome}
        onChange={handle_change}
      />
      <label htmlFor="cargos">Cargos</label>
      <select
        name="cargo"
        value={signData.cargos && signData.cargos[0]}
        onChange={handle_change}
      >
        {signData.cargos &&
          signData.cargos.map((c) => {
            return <option value={c.id}>{c.descricao}</option>;
          })}
      </select>
      <label htmlFor="cargos">Setores</label>
      <select name="setor" onChange={handle_change}>
        {signData.setores &&
          signData.setores.map((s) => {
            return <option value={s.id}>{s.descricao}</option>;
          })}
      </select>

      <input type="submit" onClick={setDefaultValues} />
    </form>
  );
};

export default Signup;
