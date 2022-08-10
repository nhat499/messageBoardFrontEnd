import {createSlice} from '@reduxjs/toolkit';

const singleTopicSlice = createSlice({
    name:'singleTopic',
    initialState: {
        singleTopic:[],
        isLoading: true
    },
    reducers: {
        getSingleTopicStart: (state) => {
            state.isLoading = true;
        },
        getSingleTopicFinish: (state, action) => {
            state.singleTopics= action.payload;
            state.isLoading = false;
        },
        getSingleTopicFail: (state) => {
            state.isLoading = false;
        }
    }
})

export const {getSingleTopicStart, getSingleTopicFinish, getSingleTopicFail} = singleTopicSlice.actions;
export default singleTopicSlice.reducer;