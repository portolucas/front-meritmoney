import http from "./httpService";

export function getAllCharges() {
  return http.get(`/webapi/cargos/`);
}

/**
 * 
 * @param {object} body 
 * Exemple:
 * {
	"descricao": "Suporte"
    }   
 */

export function createCharge(body) {
  return http.post(`/webapi/cargos/`, body);
}
