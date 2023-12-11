import axios from 'axios';

export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

const apiBuilder = (mainRouteName) => ({
  fetchById: (id) => axios.get(`${API_BASE_URL}/${mainRouteName}/${id}`),

  fetchByPages: () =>
    axios.get(`${API_BASE_URL}/${mainRouteName}?per_page=10&page=1`),

  fetchAll: () => axios.get(`${API_BASE_URL}/${mainRouteName}/all/items`),

  searchByIdAndGetByPages: (id) =>
    axios.get(`${API_BASE_URL}/${mainRouteName}?q=${id}&per_page=10&page=1`),

  searchByIdAndGetAll: (id) =>
    axios.get(`${API_BASE_URL}/${mainRouteName}/all?q=${id}`),

  createNew: (item) => axios.post(`${API_BASE_URL}/${mainRouteName}`, item),

  update: (id, item) => axios.put(`${API_BASE_URL}/${mainRouteName}/${id}`, item),

  delete: (id) => axios.delete(`${API_BASE_URL}/${mainRouteName}/${id}`),
});

export default apiBuilder;
