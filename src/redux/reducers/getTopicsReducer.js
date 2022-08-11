
import * as types from '../ActionTypes';

const initialState = {
    isLoading: true,
    data: {},
    error: null
};

const getTopicsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TOPICS_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case types.GET_TOPICS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data:{...action.data}
            };
        case types.GET_TOPICS_ERROR:
            return {
                ...state,
                isLoading:false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default getTopicsReducers;