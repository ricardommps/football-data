import axios from "axios";
import { ToastManager } from '../common/UI'
export const _axios = axios.create({
  baseURL: "https://api.football-data.org/v2/competitions",
  timeout: 2000,
  headers: {
    "X-Auth-Token": "2f8cdf1dd3514a0ba88268dabe2e0a8b",
    "Content-Type": "text/plain"
  }
});

_axios.interceptors.response.use((response) => {
  // Do something with response data
  return response;
},(error) => {
  // Do something with response error
  
  // You can even test for a response code 
  // and try a new request before rejecting the promise
  
  if (error.response.status === 404) {
    ToastManager.showErrorMessage(error.response.data.message);
  }
  if (error.response.status === 401) {     
    const requestConfig = error.config;
    return axios(requestConfig);
  }
  return Promise.reject(error);
});