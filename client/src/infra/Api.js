import axios from "axios";

export class ServerResponseError extends Error {
  constructor(route) {
    super(`The route ${route} gave error response`);
    this.name = "ServerResponseError";
  }
}

const Api = axios.create({
  baseURL: "http://127.0.0.1:8080",
  responseType: "json",
});

export default Api;
