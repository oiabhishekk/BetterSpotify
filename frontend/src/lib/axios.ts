import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  
});

export default axiosInstance;