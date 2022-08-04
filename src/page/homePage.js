
import '../App.css'
import IndiviualTopic from '../component/individualTopic.js'
import React, { useEffect, useState } from 'react';
import {useQuery } from 'react-query'
import {fetchListOfTopics} from '../queries/fetchQueries.js'
import HomePageHeader from '../component/homePageHeader';
import TopicTextAreaComponent from '../component/topicTextArea';
import FadeIn from 'react-fade-in';
import PageButton from '../component/pageButton';

function homePage (props) {
    const socket = props.socket;
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] =  useState(1);
    const {data, isLoading, error, refetch, isPreviousData} = useQuery(['allTopics',search, page], 
    ()=> fetchListOfTopics(search,page), {keepPreviousData:true});

    socket.on('topicUpdated', () => {
        refetch();
    })

    const [addNewTopic, setAddNewTopic] = useState(false);
    useEffect(() =>{
        refetch();
    }, [search])

    useEffect(() => {
        if (data !== undefined) setTotalPage(Math.ceil((data.totalTopic) / 6));
    }, [data])

    if (isLoading) return 'is loading...';
    else if (error) return 'error: ' + error.message;
    else {
        const pagesArray = Array(totalPage).fill().map((_, index) => index + 1);
        return (
            <div className='homePage'>
                <HomePageHeader setSearch={setSearch} user={data.user} setAddNewTopic={setAddNewTopic}/>
                <TopicTextAreaComponent socket={socket} isNotHidden={addNewTopic} setAddNewTopic={setAddNewTopic} refetch={refetch}/>
                <FadeIn className='TopicContainer'>
                    
                    {data.result.map((eachData) => (
                            <IndiviualTopic socket={socket} key={eachData.topicId} data={eachData} allTopicRefetch={refetch}/>
                    ))}
                
                <nav>
                    {pagesArray.map(pg=> <PageButton key={pg} disabled={page===pg} pg={pg} setPage={setPage} isPreviousData={isPreviousData} />)}
                </nav>
                </FadeIn>
            </div>
        )
    }
}




export default homePage;