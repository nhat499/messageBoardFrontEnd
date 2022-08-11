import * as types from '../ActionTypes';

const initialState = {
    isLoading: true,
    data: {},
    error: null
};

const getCommentReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.GET_COMMENTS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case types.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case types.GET_COMMENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default getCommentReducer;