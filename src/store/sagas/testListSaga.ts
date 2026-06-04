import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTestListApi,
  getTestByIdApi,
  createTestApi,
  updateTestApi,
} from '../../api/testList';
import {
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
} from '../slices/testListSlice';

function* getTestListWorker(): Generator<any, void, any> {
  try {
    const response = yield call(getTestListApi);
    yield put(getTestListSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      getTestListFailure(
        error?.response?.data?.message || 'Failed to load test list'
      )
    );
  }
}

function* getTestByIdWorker(
  action: ReturnType<typeof getTestByIdRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(getTestByIdApi, action.payload);
    yield put(getTestByIdSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      getTestByIdFailure(
        error?.response?.data?.message || 'Failed to load test details'
      )
    );
  }
}

function* createTestWorker(
  action: ReturnType<typeof createTestRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(createTestApi, action.payload);
    yield put(createTestSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      createTestFailure(
        error?.response?.data ?? { message: 'Failed to create test' }
      )
    );
  }
}

function* updateTestWorker(
  action: ReturnType<typeof updateTestRequest>
): Generator<any, void, any> {
  try {
    const { id, payload } = action.payload;
    const response = yield call(updateTestApi, id, payload);
    yield put(updateTestSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      updateTestFailure(
        error?.response?.data ?? { message: 'Failed to update test' }
      )
    );
  }
}

export function* testListSaga() {
  yield takeLatest(getTestListRequest.type, getTestListWorker);
  yield takeLatest(getTestByIdRequest.type, getTestByIdWorker);
  yield takeLatest(createTestRequest.type, createTestWorker);
  yield takeLatest(updateTestRequest.type, updateTestWorker);
}
