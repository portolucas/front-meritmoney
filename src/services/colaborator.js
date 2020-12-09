import http from "./httpService";

export function getAllColaborators() {
  return http.get(`/webapi/colaboradores/`);
}

export function getColaboratorById(id) {
  return http.get(`/webapi/colaboradores/${id}`);
}

/**
 * 
 * @param {object} body 
 * Exemple:
 * {
	"nome": "João",
	"sobrenome": "Dias",
	"cargo": 2,
	"setor": 2,
	"saldo_acumulado": 20,
	"saldo_recebido": 0,
	"premios": null
	}
 */

export function createColaborator(body) {
  return http.post(`/webapi/colaboradores/`, body);
}
