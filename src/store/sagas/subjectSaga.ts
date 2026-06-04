import { call, put, takeLatest } from 'redux-saga/effects';
import { getSubjectsApi } from '../../api/subjectApi';
import {
  getSubjectsRequest,
  getSubjectsSuccess,
  getSubjectsFailure,
} from '../slices/subjectSlice';

function* getSubjectsWorker(): Generator<any, void, any> {
  try {
    const response = yield call(getSubjectsApi);

    yield put(getSubjectsSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      getSubjectsFailure(
        error?.response?.data?.message || 'Failed to load subjects'
      )
    );
  }
}

export function* subjectSaga() {
  yield takeLatest(getSubjectsRequest.type, getSubjectsWorker);
}
