import axios from 'axios';

export const api = axios.create({
  baseURL: String(process.env.api_base_url),
  timeout: 5000,
});
