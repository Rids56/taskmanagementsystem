import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import subjectsReducer from './slices/subjectSlice';
import topicReducer from './slices/topicSlice';
import subTopicReducer from './slices/subTopicSlice';
import testListReducer from './slices/testListSlice';
import questionReducer from './slices/questionSlice';
import authReducer from '../store/slices/authSlice';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    topics: topicReducer,
    subTopics: subTopicReducer,
    testList: testListReducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Types — use these throughout your app instead of plain RootState/AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
