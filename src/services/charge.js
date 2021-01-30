import http from "./httpService";

export function getAllCharges() {
  return http.get(`/merit_money/cargos/`);
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
  return http.post(`/merit_money/cargos/`, body);
}
