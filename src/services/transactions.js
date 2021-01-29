import http from "./httpService";
import moment from "moment";

export function getAllTransactions() {
  return http.get(`/webapi/transacoes/`);
}

/**
 *
 * @param {string} date '2020-10/-30'
 * @param {int} idRemetent
 * @param {int} idDestination
 */

export function getTransactionWithParams(body) {
  let date;
  if (body.date) date = moment(body.date).format("YYYY-MM-DD");
  let idRemetent = body.remetente;
  let idDestination = body.destinatario;

  if (date && !idRemetent && !idDestination) {
    return http.get(`/webapi/transacoes?data=${date}`);
  }
  if (date && idRemetent && !idDestination) {
    return http.get(`/webapi/transacoes?data=${date}&remetente=${idRemetent}`);
  }
  if (date && idDestination && !idRemetent) {
    return http.get(
      `/webapi/transacoes?data=${date}&destinatario=${idDestination}`
    );
  }
  if (date && idRemetent && idDestination) {
    return http.get(
      `/webapi/transacoes?data=${date}&remetente=${idRemetent}&destinatario=${idDestination}`
    );
  }
  if (idRemetent && !idDestination && !date) {
    return http.get(`/webapi/transacoes?remetente=${idRemetent}`);
  }
  if (idRemetent && idDestination && !date) {
    console.log("aqio");
    return http.get(
      `/webapi/transacoes?remetente=${idRemetent}&destinatario=${idDestination}`
    );
  }
  if (idDestination && !date && !idRemetent) {
    return http.get(`/webapi/transacoes?destinatario=${idDestination}`);
  }
}
