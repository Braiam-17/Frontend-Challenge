import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const PostService = {
  // Obtener todos los posts
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Obtener un post específico
  getPost: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Obtener usuario
  getUser: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Obtener comentarios de un post
  getPostComments: async (postId) => {
    const response = await api.get(`/comments?postId=${postId}`);
    return response.data;
  },

  // Crear un nuevo post
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // Actualizar un post
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // Eliminar un post
  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};