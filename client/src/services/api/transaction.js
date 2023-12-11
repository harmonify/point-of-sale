import axios from 'axios';
import './axiosClient';
import { API_BASE_URL } from './apiBuilder';

const getTransactionId = () => axios.get(`${API_BASE_URL}/sale/transactionId`);

const saveNormalSale = (sale) => axios.post(`${API_BASE_URL}/sale/normal`, sale);

const saveCreditSale = (sale) => axios.post(`${API_BASE_URL}/sale/normal`, sale);

// eslint-disable-next-line
export default { getTransactionId, saveNormalSale, saveCreditSale };
