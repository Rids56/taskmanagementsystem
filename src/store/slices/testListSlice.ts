import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestList } from '../../pages/interfaceType';

interface TestListState {
  data: TestList[];
  selected: TestList | null;
  loading: boolean;
  error: any | null;
}

const initialState: TestListState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

const testListSlice = createSlice({
  name: 'testList',
  initialState,
  reducers: {
    getTestListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTestListSuccess: (state, action: PayloadAction<TestList[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    getTestListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTestByIdRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    getTestByIdSuccess: (state, action: PayloadAction<TestList>) => {
      state.loading = false;
      state.selected = action.payload;
    },
    getTestByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTestRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    createTestSuccess: (state, action: PayloadAction<TestList>) => {
      state.loading = false;
      // prepend new test to list
      state.data = [action.payload, ...state.data];
      state.selected = action.payload;
    },
    createTestFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTestRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    updateTestSuccess: (state, action: PayloadAction<TestList>) => {
      state.loading = false;
      state.data = state.data.map((test) =>
        test.id === action.payload.id ? action.payload : test
      );
      state.selected = action.payload;
    },
    updateTestFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetTestList: () => initialState,
  },
});

export const {
  getTestListRequest,
  getTestListSuccess,
  getTestListFailure,
  getTestByIdRequest,
  getTestByIdSuccess,
  getTestByIdFailure,
  createTestRequest,
  createTestSuccess,
  createTestFailure,
  updateTestRequest,
  updateTestSuccess,
  updateTestFailure,
  resetTestList,
} = testListSlice.actions;

export default testListSlice.reducer;
