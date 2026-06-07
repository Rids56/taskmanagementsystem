import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestList } from '../../pages/interfaceType';

interface TestListState {
  get: {
    data: TestList[];
    selected: TestList | null;
    loading: boolean;
    error: any | null;
  };
  getOne: {
    data: TestList[];
    selected: TestList | null;
    loading: boolean;
    error: any | null;
  };
  add: {
    data: TestList[];
    selected: TestList | null;
    loading: boolean;
    error: any | null;
  };
  edit: {
    data: TestList[];
    selected: TestList | null;
    loading: boolean;
    error: any | null;
  };
  delete: {
    data: TestList[];
    selected: TestList | null | any;
    loading: boolean;
    error: any | null;
  };
}

const initialState: TestListState = {
  get: {
    data: [],
    selected: null,
    loading: false,
    error: null,
  },
  getOne: {
    data: [],
    selected: null,
    loading: false,
    error: null,
  },
  add: {
    data: [],
    selected: null,
    loading: false,
    error: null,
  },
  edit: {
    data: [],
    selected: null,
    loading: false,
    error: null,
  },
  delete: {
    data: [],
    selected: null,
    loading: false,
    error: null,
  },
};

const testListSlice = createSlice({
  name: 'testList',
  initialState,
  reducers: {
    getTestListRequest: (state) => {
      state.get.loading = true;
      state.get.error = null;
    },
    getTestListSuccess: (state, action: PayloadAction<TestList[]>) => {
      state.get.loading = false;
      state.get.data = action.payload;
    },
    getTestListFailure: (state, action: PayloadAction<string>) => {
      state.get.loading = false;
      state.get.error = action.payload;
    },
    getTestByIdRequest: (state, _action: PayloadAction<string>) => {
      state.getOne.loading = true;
      state.getOne.error = null;
    },
    getTestByIdSuccess: (state, action: PayloadAction<TestList>) => {
      state.getOne.loading = false;
      state.getOne.selected = action.payload;
    },
    getTestByIdFailure: (state, action: PayloadAction<string>) => {
      state.getOne.loading = false;
      state.getOne.error = action.payload;
    },
    createTestRequest: (state, _action: PayloadAction<any>) => {
      state.add.loading = true;
      state.add.error = null;
    },
    createTestSuccess: (state, action: PayloadAction<TestList>) => {
      state.add.loading = false;
      // prepend new test to list
      state.add.data = [action.payload, ...state.add.data];
      state.add.selected = action.payload;
    },
    createTestFailure: (state, action: PayloadAction<any>) => {
      state.add.loading = false;
      state.add.error = action.payload;
    },
    updateTestRequest: (state, _action: PayloadAction<any>) => {
      state.edit.loading = true;
      state.edit.error = null;
    },
    updateTestSuccess: (state, action: PayloadAction<TestList>) => {
      state.edit.loading = false;
      state.edit.data = [action.payload, ...state.edit.data];
      state.edit.selected = action.payload;
    },
    updateTestFailure: (state, action: PayloadAction<any>) => {
      state.edit.loading = false;
      state.edit.error = action.payload;
    },
    deleteTestRequest: (state, _action: PayloadAction<any>) => {
      state.delete.loading = true;
      state.delete.error = null;
    },
    deleteTestSuccess: (state, action: PayloadAction<TestList>) => {
      state.delete.loading = false;
      state.delete.data = state.delete.data.map((test) =>
        test.id === action.payload.id ? action.payload : test
      );
      state.delete.selected = action.payload;
    },
    deleteTestFailure: (state, action: PayloadAction<any>) => {
      state.delete.loading = false;
      state.delete.error = action.payload;
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
  deleteTestRequest,
  deleteTestSuccess,
  deleteTestFailure,
  resetTestList,
} = testListSlice.actions;

export default testListSlice.reducer;
