import http from "../httpService";

export function signup(body) {
  let headers = {
    "Content-Type": "application/json",
  };
  return http.post(`/webapi/users/`, body, {
    headers: headers,
  });
}
