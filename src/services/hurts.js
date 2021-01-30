import http from "./httpService";

/**
 * 
 * @param {int} idColaborator 
 */

export function listHurtsByColaborator(idColaborator) {
  return http.get(`/merit_money/listar_doacoes_colaborador/${idColaborator}/`);
}
