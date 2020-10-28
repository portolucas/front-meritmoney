import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8000";
axios.defaults.headers = {
  Authorization: localStorage.getItem('token') ? `JWT ${localStorage.getItem('token')}` : false,
};
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  axios: axios,
};
