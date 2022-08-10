import {createSlice} from '@reduxjs/toolkit';
// reducer/action
const topicsSlice = createSlice({
    name:'topics',
    initialState: {
        topics:[],
        isLoading: true
    },
    reducers: {
        getTopicStart: (state) => {
            state.isLoading = true;
        },
        getTopicFinish: (state, action) => {
            state.topics = action.payload;
            state.isLoading = false;
        },
        getTopicFail: (state) => {
            state.isLoading = false;
        }
    }
});

export const {getTopicStart, getTopicFinish, getTopicFail} = topicsSlice.actions;

export default topicsSlice.reducer;