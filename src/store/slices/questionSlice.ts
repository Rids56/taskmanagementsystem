import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuestionItem {
  id: number | string;
  type: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_option: string;
  explanation?: string;
  difficulty?: string;
  topic?: any;
  sub_topic?: any;
  test_id?: string | number;
}

interface QuestionState {
  add: {
    data: QuestionItem[];
    loading: boolean;
    error: any | null;
  };
  edit: {
    data: QuestionItem[];
    loading: boolean;
    error: any | null;
  };
  get: {
    data: QuestionItem[];
    loading: boolean;
    error: any | null;
  };
}

const initialState: QuestionState = {
  add: {
    data: [],
    loading: false,
    error: null,
  },
  edit: {
    data: [],
    loading: false,
    error: null,
  },
  get: {
    data: [],
    loading: false,
    error: null,
  },
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    createQuestionsRequest: (state, _action: PayloadAction<any>) => {
      state.add.loading = true;
      state.add.error = null;
    },
    createQuestionsSuccess: (state, action: PayloadAction<QuestionItem[]>) => {
      state.add.loading = false;
      state.add.data = action.payload;
    },
    createQuestionsFailure: (state, action: PayloadAction<any>) => {
      state.add.loading = false;
      state.add.error = action.payload;
    },
    updateQuestionsRequest: (state, _action: PayloadAction<any>) => {
      state.edit.loading = true;
      state.edit.error = null;
    },
    updateQuestionsSuccess: (state, action: PayloadAction<QuestionItem[]>) => {
      state.edit.loading = false;
      state.edit.data = action.payload;
    },
    updateQuestionsFailure: (state, action: PayloadAction<any>) => {
      state.edit.loading = false;
      state.edit.error = action.payload;
    },
    getQuestionsRequest: (state, _action: PayloadAction<any>) => {
      state.get.loading = true;
      state.get.error = null;
    },
    getQuestionsSuccess: (state, action: PayloadAction<QuestionItem[]>) => {
      state.get.loading = false;
      state.get.data = action.payload;
    },
    getQuestionsFailure: (state, action: PayloadAction<any>) => {
      state.get.loading = false;
      state.get.error = action.payload;
    },
    resetQuestions: () => initialState,
  },
});

export const {
  createQuestionsRequest,
  createQuestionsSuccess,
  createQuestionsFailure,
  updateQuestionsRequest,
  updateQuestionsSuccess,
  updateQuestionsFailure,
  getQuestionsRequest,
  getQuestionsSuccess,
  getQuestionsFailure,
  resetQuestions,
} = questionSlice.actions;

export default questionSlice.reducer;
