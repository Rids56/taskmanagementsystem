import { call, put, takeLatest } from 'redux-saga/effects';

import { IKeyedObject } from '../../pages/interfaceType';
import { getTopicsBySubjectApi } from '../api/topicApi';
import {
  getTopicsFailure,
  getTopicsRequest,
  getTopicsSuccess,
} from '../slices/topicSlice';

function* getTopicsWorker(
  action: ReturnType<typeof getTopicsRequest>
): Generator<IKeyedObject, void, IKeyedObject> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = yield call(getTopicsBySubjectApi as any, action.payload);

    yield put(getTopicsSuccess(response.data ?? response));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
