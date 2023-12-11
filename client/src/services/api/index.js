import { createApi, retry } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import apiBuilder, { API_BASE_URL } from './apiBuilder';
import './axiosClient';
import transaction from './transaction';
import ApiService from './api.service';

const auth = {
  login: async ({ username, password }) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, {
        userid: username,
        password,
      });
      const { authToken } = res.data;

      if (!authToken) throw new { error: 'Invalid credentials' }();
      else return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401)
        throw new Error('Invalid credentials.');
      if (error.response && error.response.status > 200)
        throw new Error('Server error, please try again after sometime.');
      else throw error;
    }
  },
};

const productType = apiBuilder('producttypes');

const expenseType = apiBuilder('expensetypes');

const expense = apiBuilder('expenses');

const product = apiBuilder('products');

const customer = apiBuilder('customers');

const vendor = apiBuilder('vendors');

const receiving = apiBuilder('receivings');

const apiService = new ApiService();

const baseQuery =
  () =>
  async ({ method, url, body, config, noTransform, fullResponse }) => {
    try {
      const response =
        method === 'get'
          ? await apiService[method](url, config)
          : await apiService[method](url, body, config);

      if (noTransform) {
        return response;
      }

      if (fullResponse) return { data: response };

      return { data: response?.data || response?.message };
    } catch (err) {
      const error = {
        status: err.response?.status,
        data: err.response?.data || err?.message,
      };

      return { error };
    }
  };

const api = createApi({
  baseQuery: retry(baseQuery(), { maxRetries: 0 }),
  endpoints: () => ({}),
});

export default api;

export {
  auth,
  productType,
  product,
  customer,
  expense,
  expenseType,
  vendor,
  receiving,
  transaction,
};
