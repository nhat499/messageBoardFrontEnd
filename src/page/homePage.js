
import '../App.css'
import IndiviualTopic from '../component/individualTopic.js'
import React, { useEffect, useState } from 'react';
import {useQuery } from 'react-query'
import {fetchListOfTopics} from '../queries/fetchQueries.js'
import HomePageHeader from '../component/homePageHeader';
import TopicTextAreaComponent from '../component/topicTextArea';
import FadeIn from 'react-fade-in';
import PageButton from '../component/pageButton';

import {useSelector, useDispatch} from 'react-redux';
import {getTopicStart} from '../rtksaga/slicesReducerAction/getTopic'

function homePage (props) {
    const socket = props.socket;
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [addNewTopic, setAddNewTopic] = useState(false);

    const topics = useSelector(state=>state.topics);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopicStart({search: search, page: page}));
    }, [search, page])

    socket.on('topicUpdated', () => {
        dispatch(getTopicStart({search: search, page: page}));
    })

    let pagesArray;
    if (topics.topics.totalTopic) {
        pagesArray = Array(Math.ceil(
            (topics.topics.totalTopic) / 6))
            .fill()
            .map((_, index) => index + 1);
    }
    return (
        <div className='homePage'>
            <HomePageHeader 
                setSearch={setSearch} 
                user={topics.topics.user} 
                setAddNewTopic={setAddNewTopic}/>
            <TopicTextAreaComponent 
                socket={socket} 
                isNotHidden={addNewTopic}
                setAddNewTopic={setAddNewTopic} /*refetch={refetch}*//>
            <FadeIn className='TopicContainer'>
                
                {topics.topics.result && topics.topics.result.map((eachData) => (
                        <IndiviualTopic 
                            socket={socket} 
                            key={eachData.topicId} 
                            data={eachData} /*allTopicRefetch={refetch}*//>
                ))}
            <nav>
                {pagesArray && 
                    pagesArray.map(pg=> <PageButton key={pg} disabled={page===pg} pg={pg} setPage={setPage}/>)}
            </nav>
            </FadeIn>
        </div>
    )
}




export default homePage;