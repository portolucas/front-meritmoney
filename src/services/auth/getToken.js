import http from "../httpService";

/**
 * 
 * @param {object} body
 * Exemple:
 * {
	"username": "debora",
	"password": "debora"
  } 
 */

export function getToken(body) {
  let headers = {
    "Content-Type": "application/json",
  };
  return http.post(`/token-auth/`, body, {
    headers: headers,
  });
}
