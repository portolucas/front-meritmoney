import http from "../httpService";

export function getCurrentUser() {
  return http.get(`/merit_money/current_user/`);
}
