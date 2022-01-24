import axios from 'axios';
import { API_HEADER, API_BASE_URL } from './const';

const API_CLIENT_URL = `${API_BASE_URL}/clients`;

const axiosWithHeaders = axios.create({
  baseURL: API_CLIENT_URL,
  headers: API_HEADER,
});

export const list = async () => {
  return axiosWithHeaders.get('/list');
};

export const remove = async (id) => {
  return axiosWithHeaders.delete(`/${id}`);
};

export const update = async (data) => {
  return axios.put(`${API_CLIENT_URL}/${data._id}`, {
    API_HEADER,
    data,
  });
};

export const create = async (data) => {
  return axios.post(`${API_CLIENT_URL}/create`, {
    API_HEADER,
    data,
  });
};
