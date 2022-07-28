
import '../App.css'
import IndiviualTopic from '../component/individualTopic.js'
import React, { useEffect, useState } from 'react';
import {useQuery } from 'react-query'
import {fetchListOfTopics} from '../queries/fetchQueries.js'
import HomePageHeader from '../component/homePageHeader';
import TopicTextAreaComponent from '../component/topicTextArea';
import FadeIn from 'react-fade-in';

function homePage () {
    const {data, isLoading, error, refetch} = useQuery(['allTopics'], 
    () => fetchListOfTopics(), {enabled: false});

    const [addNewTopic, setAddNewTopic] = useState(false);
    // const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        refetch();
        // getUserInfo().then(res => {
        //     if (res.status === 200) setIsSignedIn(true);
        // })
       
    }, [])

    if (isLoading) return 'is loading...';
    else if (error) return 'error: ' + error.message;
    else {
        return (
            <div className='TopicContainer'>
                <HomePageHeader isSignedIn={data.user} setAddNewTopic={setAddNewTopic}/>
                <TopicTextAreaComponent isNotHidden={addNewTopic} setAddNewTopic={setAddNewTopic} refetch={refetch}/>
                <FadeIn>
                    {data.result.map((eachData, k) => (
                        <IndiviualTopic key={k} data={eachData} topicRefetch={refetch}/>
                    ))}
                </FadeIn>
            </div>
        )
    }
}

export default homePage;