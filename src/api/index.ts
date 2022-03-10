import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const client = axios.create({ baseURL });

export type Response<T> = {
  data?: T;
  error?: any;
};
