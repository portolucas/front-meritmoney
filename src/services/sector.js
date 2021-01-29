import http from "./httpService";

export function getAllSectors() {
    return http.get(`/webapi/setores/`)
}

/**
 * 
 * @param {object} body 
 * Exemple:
 * {
	"descricao": "Sucesso do cliente"
    }
 */

export function createSector(body) {
    return http.post(`/webapi/setores/`, body)
}