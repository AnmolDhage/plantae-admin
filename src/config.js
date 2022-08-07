import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://plantae-server.herokuapp.com/api/"
})

export default axiosInstance;