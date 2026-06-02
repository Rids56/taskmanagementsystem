import { all } from 'redux-saga/effects';
import { watchCounter } from './counterSaga';

// rootSaga combines (merges) all sagas in one place
export default function* rootSaga() {
  yield all([
    watchCounter(),
    // Add more watchers here
  ]);
}
