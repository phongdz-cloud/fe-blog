import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com', // Replace with your API base URL
  baseURL: 'http://localhost:8080/api', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    // Get token from localStorage or your auth store
    const token = localStorage.getItem('token');

    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Any status code within the range of 2xx trigger this function
    return response;
  },
  error => {
    // Any status codes outside the range of 2xx trigger this function
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          localStorage.removeItem('token');
          break;
        case 403:
          // Handle forbidden
          console.error('Forbidden access');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        case 500:
          // Handle server error
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
