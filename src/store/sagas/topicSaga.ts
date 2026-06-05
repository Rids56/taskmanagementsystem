import { call, put, takeLatest } from 'redux-saga/effects';
import { getTopicsBySubjectApi } from '../api/topicApi';
import {
  getTopicsRequest,
  getTopicsSuccess,
  getTopicsFailure,
} from '../slices/topicSlice';

function* getTopicsWorker(
  action: ReturnType<typeof getTopicsRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(getTopicsBySubjectApi, action.payload);

    yield put(getTopicsSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      getTopicsFailure(
        error?.response?.data?.message || 'Failed to load topics'
      )
    );
  }
}

export function* topicSaga() {
  yield takeLatest(getTopicsRequest.type, getTopicsWorker);
}
