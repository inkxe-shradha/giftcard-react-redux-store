import axios from "axios";

const BASE_URL = "http://localhost:3001/";
const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
