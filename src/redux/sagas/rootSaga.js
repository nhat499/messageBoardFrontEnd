import { all } from 'redux-saga/effects';
import getTopicsSaga from './getTopicsSaga'
import getSingleTopicSaga from './getSingleTopicSaga';
import getCommentSaga from './getCommentSaga';
import getRepliesSaga from './getReplySaga';

export default function* rootSaga() {
    yield all([
        getTopicsSaga(),
        getSingleTopicSaga(),
        getCommentSaga(),
        getRepliesSaga()
    ])
}