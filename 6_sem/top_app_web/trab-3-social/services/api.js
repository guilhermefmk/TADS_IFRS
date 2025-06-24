import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://simple-api-ngvw.onrender.com',
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cadastro de usuário
export const registerUser = (data) => api.post('/users', data);
// Login
export const loginUser = (data) => api.post('/login', data);
// Listagem de usuários
export const getUsers = (params) => api.get('/users', { params });
// Listagem de posts
export const getPosts = (params) => api.get('/posts', { params });
// Criação de post
export const createPost = (formData) =>
  api.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': '*/*'
    },
    transformRequest: data => data
  });
// Exclusão de post
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const getMyPosts = () => api.get('/my-posts');

export default api;