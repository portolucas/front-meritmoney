import http from "../httpService";

/**
 * 
 * @param {object} body
 * Exemple:
 * {
	"username": "debora",
	"password": "debora",
	"nome": "Débora",
	"sobrenome": "Não sei",
	"cargo": 1,
	"setor": 1
  } 
 */

export function signup(body) {
  let headers = {
    "Content-Type": "application/json",
  };
  return http.post(`/merit_money/users/`, body, {
    headers: headers,
  });
}
