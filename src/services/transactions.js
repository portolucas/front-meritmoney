import http from "./httpService";

export function getAllTransactions() {
  return http.get(`/webapi/transacoes/`);
}

/**
 *
 * @param {string} date '2020/10/30'
 * @param {int} idRemetent
 * @param {int} idDestination
 */

export function getTransactionWithParams(body) {
  let date = body.date;
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
      `/webapi/transacoes?data=${date}&remetente=${idRemetent}?destinatario=${idDestination}`
    );
  }
  if (idRemetent && !idDestination && !date) {
    return http.get(`/webapi/transacoes?remetente=${idRemetent}`);
  }
  if (idRemetent && idDestination && !date) {
    console.log('aqio')
    return http.get(
      `/webapi/transacoes?remetente=${idRemetent}&destinatario=${idDestination}`
    );
  }
  if (idDestination && !date && !idRemetent) {
    return http.get(`/webapi/transacoes?destinatario=${idDestination}`);
  }
}
