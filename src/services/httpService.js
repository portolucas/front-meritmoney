import axios from "axios";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8000";
axios.defaults.headers = {
  Authorization: `JWT ${localStorage.getItem('token')}`
};
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  axios: axios,
};
