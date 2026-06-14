import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Topic {
  id: string;
  name: string;
  subject_id?: string;
}

interface TopicState {
  data: Topic[];
  loading: boolean;
  error: string | null;
}

const initialState: TopicState = {
  data: [],
  loading: false,
  error: null,
};

const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    getTopicsRequest: (state /* action: PayloadAction<string> */) => {
      state.loading = true;
      state.error = null;
    },

    getTopicsSuccess: (state, action: PayloadAction<Topic[]>) => {
      state.loading = false;
      state.data = action.payload;
    },

    getTopicsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetTopics: () => initialState,
  },
});

export const {
  getTopicsRequest,
  getTopicsSuccess,
  getTopicsFailure,
  resetTopics,
} = topicSlice.actions;

export default topicSlice.reducer;
