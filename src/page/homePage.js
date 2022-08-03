
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
    // const search = 'a';
    const {data, isLoading, error, refetch, isPreviousData} = useQuery(['allTopics',search, page], 
    ()=> fetchListOfTopics(search,page), {keepPreviousData:true});

    socket.on('topicUpdated', () => {
        console.log("updating topic");
        refetch();
    })

    // function nextPage() {setPage(prev => prev+1);}
    // function prevPage() {setPage(prev => prev -1);}

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
        console.log(totalPage);
        const pagesArray = Array(totalPage).fill().map((_, index) => index + 1);
        
        return (
            <div className='TopicContainer'>
                <HomePageHeader setSearch={setSearch} user={data.user} setAddNewTopic={setAddNewTopic}/>
                <TopicTextAreaComponent socket={socket} isNotHidden={addNewTopic} setAddNewTopic={setAddNewTopic} refetch={refetch}/>
                <FadeIn>
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