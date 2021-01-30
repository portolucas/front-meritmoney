import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://mm-puc.herokuapp.com";
axios.defaults.headers = {
  Authorization: `JWT ${localStorage.getItem("token")}`,
};
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  axios: axios,
};
