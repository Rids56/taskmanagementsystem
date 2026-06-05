import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubTopic {
  id: string;
  name: string;
  topic_id?: string;
}

interface SubTopicState {
  data: SubTopic[];
  loading: boolean;
  error: string | null;
}

const initialState: SubTopicState = {
  data: [],
  loading: false,
  error: null,
};

const subTopicSlice = createSlice({
  name: 'subtopics',
  initialState,
  reducers: {
    getSubTopicsRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    getSubTopicsSuccess: (state, action: PayloadAction<SubTopic[]>) => {
      state.loading = false;
      state.data = action.payload;
    },

    getSubTopicsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    getMultiSubTopicsRequest: (state, _action: PayloadAction<string[]>) => {
      state.loading = true;
      state.error = null;
    },

    getMultiSubTopicsSuccess: (state, action: PayloadAction<SubTopic[]>) => {
      state.loading = false;
      state.data = action.payload;
    },

    getMultiSubTopicsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetSubTopics: () => initialState,
  },
});

export const {
  getSubTopicsRequest,
  getSubTopicsSuccess,
  getSubTopicsFailure,
  getMultiSubTopicsRequest,
  getMultiSubTopicsSuccess,
  getMultiSubTopicsFailure,
  resetSubTopics,
} = subTopicSlice.actions;

export default subTopicSlice.reducer;
