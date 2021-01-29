import http from "./httpService";

/**
 * 
 * @param {int} idColaborator 
 */

export function listHurtsByColaborator(idColaborator) {
  return http.get(`/webapi/listar-doacoes-colaborador/${idColaborator}/`);
}
