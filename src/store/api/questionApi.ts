import { QuestionItem } from '../slices/questionSlice';
import axios from './axios';

export const createQuestionsBulkApi = async (payload: QuestionItem) => {
  const response = await axios.post('/questions/bulk', payload);
  return response.data;
};

export const updateQuestionsBulkApi = async (payload: QuestionItem) => {
  const response = await axios.put('/questions/bulk', payload);
  return response.data;
};

export const getQuestionsBulkApi = async (payload: QuestionItem) => {
  const response = await axios.post('/questions/fetchBulk', payload);
  return response.data;
};

// export const deleteQuestionsBulkApi = async (payload: QuestionItem) => {
//   const response = await axios.delete('/questions/bulk', payload);
//   return response.data;
// };

export const deleteQuestionsBulkApi = async (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: QuestionItem | any
) => {
  const response = await axios.delete(`/questions/${id}`, payload);
  return response.data;
};
