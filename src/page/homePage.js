
import '../App.css'
import IndiviualTopic from '../component/individualTopic.js'
import React, { useEffect, useState } from 'react';
import HomePageHeader from '../component/homePageHeader';
import TopicTextAreaComponent from '../component/topicTextArea';
import FadeIn from 'react-fade-in';
import PageButton from '../component/pageButton';

import {useSelector, useDispatch} from 'react-redux';
import * as types from '../redux/ActionTypes'

function homePage (props) {
    const socket = props.socket;
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const data = useSelector(state=>state.getTopicsReducers.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: types.GET_TOPICS_REQUEST, payload:{search:search, page:page}});
    }, [search, page]);

    socket.on('topicUpdated', () => {
        dispatch({type: types.GET_TOPICS_REQUEST, payload:{search:search, page:page}});
    })

    const [addNewTopic, setAddNewTopic] = useState(false);
    let pagesArray;
    if(data.totalTopic)
        pagesArray = Array(Math.ceil((data.totalTopic) / 6))
            .fill().map((_, index) => index + 1);
    return (
        <div className='homePage'>
            <HomePageHeader 
                setSearch={setSearch} 
                user={data.user} 
                setAddNewTopic={setAddNewTopic}/>
            <TopicTextAreaComponent 
                socket={socket} 
                isNotHidden={addNewTopic} 
                setAddNewTopic={setAddNewTopic} /*refetch={refetch}*//>
            <FadeIn className='TopicContainer'>
                {data.result && (data.result.map((eachData) => (
                    <IndiviualTopic 
                        socket={socket} 
                        key={eachData.topicId} 
                        data={eachData} 
                        /*allTopicRefetch={refetch}*/ />
                )))}
            <nav>
                {pagesArray && pagesArray.map(pg=> <PageButton 
                    key={pg} 
                    disabled={page===pg} 
                    pg={pg} 
                    setPage={setPage} 
                    /*isPreviousData={isPreviousData}*/ />)}
            </nav>
            </FadeIn>
        </div>
    )
}




export default homePage;