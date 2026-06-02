import { takeEvery, put, call } from 'redux-saga/effects';
import { setValue } from '../slices/counterSlice';

// A fake async (happening over time) API call — replace with real fetch
function fetchCounterValue(): Promise<number> {
  return Promise.resolve(42);
}

// Worker saga — runs when FETCH_COUNTER action is dispatched (sent)
function* handleFetchCounter() {
  const value: number = yield call(fetchCounterValue);
  yield put(setValue(value)); // put = dispatch an action
}

// Watcher saga — listens for the action
export function* watchCounter() {
  yield takeEvery('counter/fetchCounter', handleFetchCounter);
}
