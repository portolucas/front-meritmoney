import http from "./httpService";

/**
 * 
 * @param {object} body 
 * Exemple: 
 * {
	"id_remetente": 3,
	"id_destinatario": 1,
	"valor": 1,
	"justificativa": "Enviar para testar"
    }
 */

export function sendCoins(body) {
  return http.post(`/webapi/enviar-moedas/`, body);
}
