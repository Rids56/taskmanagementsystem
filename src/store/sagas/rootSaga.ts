import { all } from 'redux-saga/effects';

import { questionSaga } from './questionSaga';
import { subjectSaga } from './subjectSaga';
import { subTopicSaga } from './subTopicSaga';
import { testListSaga } from './testListSaga';
import { topicSaga } from './topicSaga';

// rootSaga combines (merges) all sagas in one place
export default function* rootSaga() {
  yield all([
    subjectSaga(),
    topicSaga(),
    subTopicSaga(),
    testListSaga(),
    questionSaga(),
  ]);
}
