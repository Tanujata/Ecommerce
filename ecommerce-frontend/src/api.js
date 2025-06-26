import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // your backend URL
const api = axios.create({ baseURL: API_URL });


export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);


const getToken = () => {
  return localStorage.getItem('token') || '';
};


export const getProducts = () => api.get('/products');

export const getProduct = (id) => api.get(`/products/${id}`);

export const createProduct = (formData) => {
  return api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};


export const getOrders = () => {
  return api.get('/orders', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createOrder = (orderData) => {
  return api.post('/orders', orderData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteOrder = (id) => {
  return api.delete(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
export default api;
