import http from "./httpService";

export function getAllPrizes() {
  return http.get(`/merit_money/premios/`);
}

export function getPrizeById(id) {
  return http.get(`/merit_money/premios/${id}`);
}

export function getAllPrizesTransactions() {
  return http.get(`/merit_money/transacao-premios/`);
}

/**
 *
 * @param {string} startDate '2020/10/30'
 * @param {string} endDate
 * @param {int} idPrize
 * @param {int} idColaborator
 */

export function getPrizesTransactionsWithParams(
  startDate,
  endDate,
  idPrize,
  idColaborator
) {
  return http.get(
    `/merit_money/transacao_premios?start-date=${startDate}?end-date=${endDate}?premio-resgatado=${idPrize}?colaborador=${idColaborator}/`
  );
}

/**
 * 
 * @param {object} body 
 * Exemple:
 * {
	"descricao": "Abraço",
	"valor": 1
    }
 */

export function createPrize(body) {
  return http.post(`/merit_money/premios/`, body);
}

/**
 * 
 * @param {object} body 
 * Exemple:
 * {
	"id_colaborador": 2,
	"id_premio": 2
    }
 */

export function rescuePrize(body) {
  return http.post(`/merit_money/resgatar_premio/`, body);
}
