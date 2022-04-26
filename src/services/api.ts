import axios from "axios";

export const api = axios.create({
  baseURL: "https://dojotec.webi9.com.br/api",
})