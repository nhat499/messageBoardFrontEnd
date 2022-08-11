import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../ActionTypes';
import {fetchListOfTopics} from '../../queries/fetchQueries';

function* getTopics(action) {
    const data = yield call (()=> fetchListOfTopics(action.payload.search, action.payload.page));
    if (data.error) {
        console.error(data.error || data);
        return {};
    }
    yield put({type: types.GET_TOPICS_SUCCESS, data: data})
}

export default function* rootSaga() {
    yield takeLatest(types.GET_TOPICS_REQUEST, getTopics);
}