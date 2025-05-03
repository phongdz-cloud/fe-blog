import api from './api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface ErrorResponse {
  message: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.status === 401) {
      throw new Error('Invalid username or password');
    }
    throw new Error(axiosError.response?.data?.message || 'Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  toast.success('Logged out successfully');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
