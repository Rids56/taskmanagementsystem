import { IKeyedObject, TestList } from '../../pages/interfaceType';
import axios from './axios';

export const getTestListApi = async () => {
  const response = await axios.get(`/tests`);
  return response.data;
};

export const getTestByIdApi = async (id: string) => {
  const response = await axios.get(`/tests/${id}`);
  return response.data;
};

export const createTestApi = async (payload: TestList) => {
  const response = await axios.post(`/tests`, payload);
  return response.data;
};

export const updateTestApi = async (id: string, payload: TestList) => {
  const response = await axios.put(`/tests/${id}`, payload);
  return response.data;
};

export const deleteTestApi = async (id: string, payload: IKeyedObject) => {
  const response = await axios.delete(`/tests/${id}`, payload);
  return response.data;
};
