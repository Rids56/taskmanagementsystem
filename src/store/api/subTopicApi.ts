import axios from './axios';

export const getSubTopicsByTopicApi = async (topicId: string) => {
  const response = await axios.get(`/sub-topics/topic/${topicId}`);
  return response.data;
};

export const getyMultiSubTopicsBTopicApi = async (topicIds: string[]) => {
  const response = await axios.post(`/sub-topics/multi-topics`, {
    topicIds,
  });
  return response.data;
};
