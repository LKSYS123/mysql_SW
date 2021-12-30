import client from './client';

export const writePost = ({ title, body }) =>
    client.post('/api/addPost', { title, body });

export const readPost = id => client.get(`/api/post/${id}`);

export const listPosts = () => {
    client.get(`/api/posts`);
};