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

export function getTransactionWithParams(date, idRemetent, idDestination) {
  return http.get(
    `/webapi/transacoes?data=${date}&?remetente=${idRemetent}&?destinatario=${idDestination}/`
  );
}
