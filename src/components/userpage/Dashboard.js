import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import {
  getAllTransactions,
  getTransactionWithParams,
} from "../../services/transactions";

import { getColaboratorById } from "../../services/colaborator";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  root: {
    padding: 50,
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const fetchAllTransactions = async () => {
    let transactions = [];
    try {
      let { data } = await getAllTransactions();
      transactions = data;
    } catch (e) {
      console.log(`error during fetch transactions api ${e}`);
    }

    try {
      for (let item in transactions) {
        let { data } = await getColaboratorById(
          transactions[item].id_remetente
        );
        transactions[item].id_remetente = data.nome;
      }
    } catch (e) {
      console.log(`error during fetch colaborator api ${e}`);
    }
    try {
      for (let item in transactions) {
        let { data } = await getColaboratorById(
          transactions[item].id_destinatario
        );
        transactions[item].id_destinatario = data.nome;
      }
    } catch (e) {
      console.log(`error during fetch colaborator api ${e}`);
    }

    if (transactions.length > 1) {
      setTransactions(transactions);
    }
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  function buildRows() {
    let rows = [];
    if (transactions.length > 1) {
      transactions.forEach((item) => {
        rows.push({
          nome_remetente: item.id_remetente,
          nome_destintario: item.id_destinatario,
          valor: item.valor,
          data: item.data_transacao,
          justificativa: item.justificativa,
        });
      });
    }
    return rows;
  }

  const rows = buildRows();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome remetente</StyledTableCell>
              <StyledTableCell align="center">
                Nome destinatário
              </StyledTableCell>
              <StyledTableCell align="center">Valor</StyledTableCell>
              <StyledTableCell align="center">Data</StyledTableCell>
              <StyledTableCell align="center">Justificativa</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {row.nome_remetente}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.nome_destintario}
                </StyledTableCell>
                <StyledTableCell align="center">{row.valor}</StyledTableCell>
                <StyledTableCell align="center">
                  {moment(row.data).local().format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.justificativa}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
