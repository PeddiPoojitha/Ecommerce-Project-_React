import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const productApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

const normalizeProduct = (product) => ({
  id: product.id,
  name: product.title,
  price: product.price,
  category: product.category,
  description: product.description,
  image: product.image,
  rating: product.rating,
});

export const getProducts = async () => {
  const { data } = await productApi.get('/products');
  return data.map(normalizeProduct);
};

export const getProductById = async (id) => {
  const { data } = await productApi.get(`/products/${id}`);
  return normalizeProduct(data);
};

export const getUsersByEmail = async (email) => {
  const { data } = await api.get(`/users?email=${email}`);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await api.post('/users', userData);
  return data;
};

export const createOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
};

export default api;
