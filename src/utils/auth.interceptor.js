import axios from 'axios';
import { BASE_URL } from '../endpoints';

const Instance = axios.create({
  baseURL: BASE_URL,
});

Instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN_KEY');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Instance;
