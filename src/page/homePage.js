
import '../App.css'
import IndiviualTopic from '../component/individualTopic.js'
import React, { useEffect, useState } from 'react';
import {useQuery } from 'react-query'
import {fetchListOfTopics} from '../queries/fetchQueries.js'
import HomePageHeader from '../component/homePageHeader';
import TopicTextAreaComponent from '../component/topicTextArea';
import FadeIn from 'react-fade-in';

function homePage (props) {
    const socket = props.socket;
    const [search, setSearch] = useState('');
    // const search = 'a';
    const {data, isLoading, error, refetch} = useQuery(['allTopics'], 
    ()=> fetchListOfTopics(search));

    socket.on('topicUpdated', () => {
        console.log("updating topic");
        refetch();
    })
    // const {data, isLoading, error, refetch} = useQuery(fetchListOfTopics, 
    //     {
    //         search,
    //         enabled: false,
    //       });

    const [addNewTopic, setAddNewTopic] = useState(false);
    // const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        refetch();
    }, [search])

    if (isLoading) return 'is loading...';
    else if (error) return 'error: ' + error.message;
    else {
        return (
            <div className='TopicContainer'>
                <HomePageHeader setSearch={setSearch} user={data.user} setAddNewTopic={setAddNewTopic}/>
                <TopicTextAreaComponent socket={socket} isNotHidden={addNewTopic} setAddNewTopic={setAddNewTopic} refetch={refetch}/>
                <FadeIn>
                    {data.result.map((eachData) => (
                        <IndiviualTopic socket={socket} key={eachData.topicId} data={eachData} topicRefetch={refetch}/>
                    ))}
                </FadeIn>
            </div>
        )
    }
}

export default homePage;