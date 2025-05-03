import api from './api';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const postService = {
  // Get all posts
  getAllPosts: async () => {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  // Get post by ID
  getPostById: async (id: number) => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  // Create new post
  createPost: async (post: Omit<Post, 'id'>) => {
    const response = await api.post<Post>('/posts', post);
    return response.data;
  },

  // Update post
  updatePost: async (id: number, post: Partial<Post>) => {
    const response = await api.put<Post>(`/posts/${id}`, post);
    return response.data;
  },

  // Delete post
  deletePost: async (id: number) => {
    await api.delete(`/posts/${id}`);
  },
};
