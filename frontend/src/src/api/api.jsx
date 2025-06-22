import axios from 'axios';

// Instância para a API
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // para as rotas da API
  withCredentials: true, // permite cookies
});

// Instância para CSRF
const csrfApi = axios.create({
  baseURL: 'http://localhost:8000',  // para as rotas de CSRF
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
// Exportação padrão como um objeto
export default{ api, csrfApi };
