import {call, put, takeLatest} from 'redux-saga/effects';
import { getTopicFinish } from './state';
import { fetchListOfTopics } from '../queries/fetchQueries';

function* workGetTopic() {
    let topics = yield call(() => fetchListOfTopics("", 1));
    console.log(topics);
    yield put(getTopicFinish(topics));
}

function* getTopicSaga() {
    yield takeLatest('topics/getTopicStart', workGetTopic);
}


export {getTopicSaga}