import { call, put, takeLatest } from 'redux-saga/effects';

import { IKeyedObject } from '../../pages/interfaceType';
import { getSubjectsApi } from '../api/subjectApi';
import {
  getSubjectsFailure,
  getSubjectsRequest,
  getSubjectsSuccess,
} from '../slices/subjectSlice';

function* getSubjectsWorker(): Generator<IKeyedObject, void, IKeyedObject> {
  try {
    const response = yield call(getSubjectsApi);

    yield put(getSubjectsSuccess(response.data ?? response));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
