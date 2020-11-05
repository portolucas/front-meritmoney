import http from "../httpService";

export function getToken(body) {
  let headers = {
    "Content-Type": "application/json",
  };
  return http.post(`/token-auth/`, body, {
    headers: headers,
  });
}
