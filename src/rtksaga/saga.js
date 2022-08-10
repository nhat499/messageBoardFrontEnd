import {call, put, takeLatest} from 'redux-saga/effects';
import { getTopicFinish } from './slicesReducerAction/getTopic';
import { fetchListOfTopics } from '../queries/fetchQueries';

function* workGetTopic(action) {
    let topics = yield call(() => fetchListOfTopics(action.payload.search, action.payload.page));
    yield put(getTopicFinish(topics));
}

function* getTopicSaga() {
    yield takeLatest('topics/getTopicStart', workGetTopic);
}


export {getTopicSaga}