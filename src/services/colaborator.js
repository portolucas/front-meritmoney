import http from "./httpService";

export function getAllColaborators() {
  return http.get(`/merit_money/colaboradores/`);
}

export function getColaboratorById(id) {
  return http.get(`/merit_money/colaboradores/${id}`);
}

// o endpoint para criar colaborador está em auth/signup
