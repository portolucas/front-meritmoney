import http from "./httpService";

export function getAllSectors() {
    return http.get(`/merit_money/setores/`)
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
    return http.post(`/merit_money/setores/`, body)
}