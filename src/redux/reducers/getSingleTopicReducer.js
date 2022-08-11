import * as types from '../ActionTypes';

const initialState = {
    isLoading: true,
    data: {},
    error: null
};

const getSingleTopicReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SINGLE_TOPIC_REQUEST:
            return {
                ...state,
                error: null,
                isLoading: true,
            };
        case types.GET_SINGLE_TOPIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data:{...action.data}
            };
        case types.GET_SINGLE_TOPIC_ERROR:
            return {
                ...state,
                isLoading:false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default getSingleTopicReducers;