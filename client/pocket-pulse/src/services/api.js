import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

/* Attach token if present */
api.interceptors.request.use((config) => {
  const tok = localStorage.getItem('token');
  if (tok) config.headers.Authorization = `Bearer ${tok}`;
  return config;
});

// Optional: if any response is a 401, force user to re-login
api.interceptors.response.use(
    res => res,
    err => {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }
      return Promise.reject(err);
    }
  );

export default api;
