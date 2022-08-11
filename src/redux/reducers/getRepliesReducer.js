import * as types from '../ActionTypes';

const initialState = {
    isLoading: true,
    data: {},
    error: null,
}

function getRepliesReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case types.GET_REPLIES_REQUEST:
            return {
                isLoading: true,
                ...state,
                error: null,
            }
        case types.GET_REPLIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        case types.GET_REPLIES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default getRepliesReducer;