import React, { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { objectSize, objectHasValue, cleanObject } from "../utils/object";

import {
  getAllTransactions,
  getTransactionWithParams,
} from "../../services/transactions";
import { getAllColaborators } from "../../services/colaborator";
import { getColaboratorById } from "../../services/colaborator";
import DashboardFilterToolbar from "./DashboardFilterToolbar";

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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    padding: 50,
  },
  title: {
    paddingBottom: 25,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [colaboratorsOptions, setColaboratorOptions] = useState([]);
  const [params, setParams] = useState({});

  const buildTable = async (transactions) => {
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

    setTransactions(transactions);
  };

  const fetchTransactionsWithParams = useCallback(async (params) => {
    let transactions = [];
    if (objectHasValue(params, null)) {
      cleanObject(params);
    }
    if (objectSize(params) >= 1) {
      try {
        let { data } = await getTransactionWithParams(params);
        transactions = data;
      } catch (e) {
        console.log(`error during fetch transactions with params api ${e}`);
      }
      buildTable(transactions);
    }
  }, []);

  const fetchAllTransactions = useCallback(async () => {
    let transactions = [];
    try {
      let { data } = await getAllTransactions();
      transactions = data;
    } catch (e) {
      console.log(`error during fetch transactions api ${e}`);
    }
    buildTable(transactions);
  }, []);

  function buildRows() {
    let rows = [];
    if (transactions.length >= 1) {
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

  const fetchColaborators = async () => {
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
  };

  useEffect(() => {
    if (objectSize(params)) fetchTransactionsWithParams(params);
  }, [params, fetchTransactionsWithParams]);

  useEffect(() => {
    fetchAllTransactions();
    fetchColaborators();
  }, [fetchAllTransactions]);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant={"h3"}>
        Dashboard
      </Typography>
      <DashboardFilterToolbar
        colaboratorsOptions={colaboratorsOptions}
        params={params}
        setParams={setParams}
        fetchAllTransactions={fetchAllTransactions}
      />
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
            {buildRows().map((row) => (
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
