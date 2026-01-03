import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only logout and redirect if we're NOT already on login/register/password-reset pages
      const currentPath = window.location.pathname;
      const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
      const isPublicPage = publicPaths.some(path => currentPath.startsWith(path));

      if (!isPublicPage) {
        // Token expired or invalid - logout user and redirect
        useUserStore.getState().logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
