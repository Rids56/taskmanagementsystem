import { all } from 'redux-saga/effects';
import { subjectSaga } from './subjectSaga';
import { topicSaga } from './topicSaga';
import { subTopicSaga } from './subTopicSaga';
import { testListSaga } from './testListSaga';

// rootSaga combines (merges) all sagas in one place
export default function* rootSaga() {
  yield all([subjectSaga(), topicSaga(), subTopicSaga(), testListSaga()]);
}
