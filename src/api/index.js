import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const url = 'http://localhost:5000';

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; 
    }

    return req; 
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?query=${searchQuery.query || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const updatePost = (id, updatePost) => API.put(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.put(`/posts/${id}/likePost`);

// User
export const googleToken = (code) => API.post(`/user/googleLogin`, { code });
export const login = (formData) => API.post('/user/login',  formData);
export const register = (formData) => API.post('/user/register', formData);
