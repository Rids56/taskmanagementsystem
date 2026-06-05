import axios from './axios';

export const getSubjectsApi = async () => {
  const response = await axios.get('/subjects');
  return response.data;
};
