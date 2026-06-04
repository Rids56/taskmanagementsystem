import { createSlice } from '@reduxjs/toolkit';

interface Subject {
  id: string;
  name: string;
}

interface SubjectState {
  data: Subject[];
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  data: [],
  loading: false,
  error: null,
};

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    getSubjectsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getSubjectsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    getSubjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetSubject: () => initialState,
  },
});

export const {
  getSubjectsRequest,
  getSubjectsSuccess,
  getSubjectsFailure,
  resetSubject,
} = subjectSlice.actions;

export default subjectSlice.reducer;
