import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../ActionTypes';
import { fetchListOfReply } from '../../queries/fetchQueries';

function* getReplies(action) {
    console.log(action);
    const data = yield call(()=> fetchListOfReply(action.payload.commentId));
    if (data.error)
        return {};
    yield put({type: types.GET_REPLIES_SUCCESS, data: data});
}

export default function* rootSaga() {
    yield takeLatest(types.GET_REPLIES_REQUEST, getReplies);
}