import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any): AxiosInstance {
  const { 'stock_management.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333/api',
  });

  if (token) {
    api.defaults.headers.authorization = token;
  }

  return api;
}
