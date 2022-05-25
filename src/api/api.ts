import config from '@config';
import axios from 'axios';

const api = axios.create({
  baseURL: config.MENTE_SERENA_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
