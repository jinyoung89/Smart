import axios from 'axios';
import { Pattern, Post, User, PatternCreate, PostCreate, YarnCalculationRequest, YarnCalculation } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersApi = {
  getUsers: () => api.get<User[]>('/users/'),
  getUser: (id: number) => api.get<User>(`/users/${id}`),
  createUser: (userData: Omit<User, 'id' | 'created_at'>) => 
    api.post<User>('/users/', userData),
};

// Patterns API
export const patternsApi = {
  getPatterns: (params?: { difficulty?: string; category?: string; skip?: number; limit?: number }) => 
    api.get<Pattern[]>('/patterns/', { params }),
  getPattern: (id: number) => api.get<Pattern>(`/patterns/${id}`),
  createPattern: (formData: FormData) => 
    api.post<Pattern>('/patterns/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

// Posts API
export const postsApi = {
  getPosts: (params?: { category?: string; skip?: number; limit?: number }) => 
    api.get<Post[]>('/posts/', { params }),
  getPost: (id: number) => api.get<Post>(`/posts/${id}`),
  createPost: (postData: PostCreate & { author_id: number }) => 
    api.post<Post>('/posts/', null, { params: postData }),
};

// Yarn Calculator API
export const calculatorApi = {
  calculateYarn: (data: YarnCalculationRequest) => 
    api.post<YarnCalculation>('/calculate/yarn', data),
};

export default api;
