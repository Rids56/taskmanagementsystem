import axios from './axios';

export const createQuestionsBulkApi = async (payload: any) => {
  const response = await axios.post('/questions/bulk', payload);
  return response.data;
};

export const updateQuestionsBulkApi = async (payload: any) => {
  const response = await axios.put('/questions/bulk', payload);
  return response.data;
};

export const getQuestionsBulkApi = async (payload: any) => {
  const response = await axios.post('/questions/fetchBulk', payload);
  return response.data;
};

export const deleteQuestionsBulkApi = async (payload: any) => {
  const response = await axios.delete('/questions/bulk', payload);
  return response.data;
};
