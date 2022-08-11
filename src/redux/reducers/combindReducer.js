import { combineReducers } from 'redux';
import getTopicsReducers from './getTopicsReducer';
import getSingleTopicReducers from './getSingleTopicReducer';
import getCommentReducer from './getCommentReducer';
import getRepliesReducer from './getRepliesReducer';

export default combineReducers({
    getTopicsReducers,
    getSingleTopicReducers,
    getCommentReducer,
    getRepliesReducer
});