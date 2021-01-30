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

export function getCurrentUser() {
  return http.get(`/merit_money/current_user/`);
}
