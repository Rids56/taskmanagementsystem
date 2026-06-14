/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getSubTopicsByTopicApi,
  getyMultiSubTopicsBTopicApi,
} from '../api/subTopicApi';
import {
  getMultiSubTopicsFailure,
  getMultiSubTopicsRequest,
  getMultiSubTopicsSuccess,
  getSubTopicsFailure,
  getSubTopicsRequest,
  getSubTopicsSuccess,
} from '../slices/subTopicSlice';

function* getSubTopicsWorker(
  action: ReturnType<typeof getSubTopicsRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(getSubTopicsByTopicApi, action.payload);

    yield put(getSubTopicsSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      getSubTopicsFailure(
        error?.response?.data?.message || 'Failed to load topics'
      )
    );
  }
}

function* getMultiSubTopicsWorker(
  action: ReturnType<typeof getMultiSubTopicsRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(getyMultiSubTopicsBTopicApi, action.payload);

    yield put(getMultiSubTopicsSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      getMultiSubTopicsFailure(
        error?.response?.data?.message || 'Failed to load topics'
      )
    );
  }
}

export function* subTopicSaga() {
  yield takeLatest(getSubTopicsRequest.type, getSubTopicsWorker);
  yield takeLatest(getMultiSubTopicsRequest.type, getMultiSubTopicsWorker);
}
