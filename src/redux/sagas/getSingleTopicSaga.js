import { call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../ActionTypes';
import {fetchSingleTopic} from '../../queries/fetchQueries';

function* getSingleTopics(action) {
    const data = yield call (()=> fetchSingleTopic(action.payload.topicId));
    if (data.error) {
        console.error(data.error || data);
        return {};
    }
    yield put({type: types.GET_SINGLE_TOPIC_SUCCESS, data: data})
}

export default function* rootSaga() {
    yield takeLatest(types.GET_SINGLE_TOPIC_REQUEST, getSingleTopics);
}