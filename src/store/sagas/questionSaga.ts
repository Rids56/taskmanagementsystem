/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createQuestionsBulkApi,
  deleteQuestionsBulkApi,
  getQuestionsBulkApi,
  updateQuestionsBulkApi,
} from '../api/questionApi';
import {
  createQuestionsFailure,
  createQuestionsRequest,
  createQuestionsSuccess,
  deleteQuestionsFailure,
  deleteQuestionsRequest,
  deleteQuestionsSuccess,
  getQuestionsFailure,
  getQuestionsRequest,
  getQuestionsSuccess,
  updateQuestionsFailure,
  updateQuestionsRequest,
  updateQuestionsSuccess,
} from '../slices/questionSlice';

function* createQuestionsWorker(
  action: ReturnType<typeof createQuestionsRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(createQuestionsBulkApi, action.payload);
    yield put(createQuestionsSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      createQuestionsFailure(
        error?.response?.data ?? { message: 'Failed to create questions' }
      )
    );
  }
}

function* updateQuestionsWorker(
  action: ReturnType<typeof updateQuestionsRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(updateQuestionsBulkApi, action.payload);
    yield put(updateQuestionsSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      updateQuestionsFailure(
        error?.response?.data ?? { message: 'Failed to update questions' }
      )
    );
  }
}

function* getQuestionsWorker(
  action: ReturnType<typeof getQuestionsRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(getQuestionsBulkApi, action.payload);
    yield put(getQuestionsSuccess(response.data ?? response));
  } catch (error: any) {
    yield put(
      getQuestionsFailure(
        error?.response?.data ?? { message: 'Failed to get questions' }
      )
    );
  }
}

function* deleteQuestionsWorker(
  action: ReturnType<typeof deleteQuestionsRequest>
): Generator<any, void, any> {
  try {
    // const response = yield call(deleteQuestionsBulkApi, action.payload);
    const { id, payload } = action.payload;
    const response = yield call(deleteQuestionsBulkApi, id, payload);
    yield put(
      deleteQuestionsSuccess(
        response.data ? { ...response.data, id } : { ...response, id }
      )
    );
  } catch (error: any) {
    yield put(
      deleteQuestionsFailure(
        error?.response?.data ?? { message: 'Failed to delete questions' }
      )
    );
  }
}

export function* questionSaga() {
  yield takeLatest(createQuestionsRequest.type, createQuestionsWorker);
  yield takeLatest(updateQuestionsRequest.type, updateQuestionsWorker);
  yield takeLatest(getQuestionsRequest.type, getQuestionsWorker);
  yield takeLatest(deleteQuestionsRequest.type, deleteQuestionsWorker);
}
