import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../ActionTypes';
import { fetchListOfComments } from '../../queries/fetchQueries';

function* getComments(action) {
    const data = yield call(()=> fetchListOfComments(action.payload.topicId));
    if (data.error) {
        console.error(data.error|| data);
        return {};
    }
    yield put({type: types.GET_COMMENTS_SUCCESS, data: data})
}

export default function* rootSaga() {
    yield takeLatest(types.GET_COMMENTS_REQUEST, getComments);
}