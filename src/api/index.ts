import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const client = axios.create({ baseURL: BASE_URL });

export type Response<T> = {
  data?: T;
  error?: any;
};
