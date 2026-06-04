import { call, put, takeLatest } from 'redux-saga/effects';
import { getSubTopicsByTopicApi } from '../../api/subTopicApi';
import {
  getSubTopicsRequest,
  getSubTopicsSuccess,
  getSubTopicsFailure,
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

export function* subTopicSaga() {
  yield takeLatest(getSubTopicsRequest.type, getSubTopicsWorker);
}
