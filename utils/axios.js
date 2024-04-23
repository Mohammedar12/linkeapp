import axios from "axios";

const instance = axios.create({
  baseURL: process.env.base_url,
  headers: {
    "Content-Type": "application/json",
    timeout: 3000,
  },
  withCredentials: true,
});

export default instance;
