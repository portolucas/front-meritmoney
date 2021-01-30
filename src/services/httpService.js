import axios from "axios";

function apiUrl() {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8000";
  } else {
    return "https://mm-puc.herokuapp.com";
  }
}

axios.defaults.baseURL = apiUrl();
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
