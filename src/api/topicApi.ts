import axios from './axios';

export const getTopicsBySubjectApi = async (subjectId: string) => {
  const response = await axios.get(`/topics/subject/${subjectId}`);
  return response.data;
};
