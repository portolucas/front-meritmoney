import http from "../httpService";

export function getCurrentUser() {
    return http.get(`/webapi/current_user/`)
}