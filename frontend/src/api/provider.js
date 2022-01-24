import axios from 'axios';
import { API_HEADER, API_BASE_URL } from './const';

const API_PROVIDER_URL = `${API_BASE_URL}/providers`;

const axiosWithHeaders = axios.create({
  baseURL: API_PROVIDER_URL,
  headers: API_HEADER,
});

export const list = async () => {
  return axiosWithHeaders.get('/list');
};

export const remove = async (id) => {
  return axiosWithHeaders.delete(`/${id}`);
};

export const update = async (data) => {
  return axios.put(`${API_PROVIDER_URL}/${data._id}`, {
    API_HEADER,
    data,
  });
};

export const add = async (data) => {
  return axios.post(`${API_PROVIDER_URL}/create`, {
    API_HEADER,
    data,
  });
};
