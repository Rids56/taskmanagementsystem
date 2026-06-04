import axios from './axios';

export const getSubTopicsByTopicApi = async (topicId: string) => {
  const response = await axios.get(`/sub-topics/topic/${topicId}`);
  return response.data;
};
