import React, { useEffect, useState } from 'react';
import '../App.css';
import { useParams } from 'react-router-dom';
import {useQuery } from 'react-query'
import {
    // fetchListOfTopics,
    fetchSingleTopic,
    fetchListOfComments,
    // getUserInfo
} from '../queries/fetchQueries.js'
import {
    CommentHeader,
    NewCommentSection,
    IndividualComment
} from '../component/newCommentSection.js'
import FadeIn from 'react-fade-in';
import LogBtn from "../component/logBtn.js";


// function Topic() {
//     const listOfTopic = useQuery(['allTopics'], () => fetchListOfTopics());
//     const {id} = useParams();
//     const {data, isLoading, error, refetch} = useQuery(['allComments'], 
//     () => fetchListOfComments(id), {enabled: false});

//     const [addNewComment, setAddNewComment] = useState(false);
//     const [isSignedIn, setIsSignedIn] = useState(false);
//     useEffect(() => {
//         refetch();
//         getUserInfo().then(res => {
//             if (res.status === 200) setIsSignedIn(true);
//         })
//     }, [])

//     const [comment, setComment] = useState("");
    

//     if (isLoading || listOfTopic.isLoading) return "loading";
//     else if (error || listOfTopic.error) return error.message;
//     else {
//         let theTopic;
//         listOfTopic.data.forEach(topic => {
//             if (topic.topicId == id) theTopic = topic;
//         })
//         return (
//             data && theTopic  && <div className="commentContainer">
                
//                 <LogBtn isSignedIn={isSignedIn}/>
//                 <CommentHeader topicRefetch={listOfTopic.refetch}
//                     addNewComment={addNewComment} 
//                     theTopic={theTopic} 
//                     setAddNewComment={setAddNewComment}/>
//                 <NewCommentSection 
//                     comment={comment} 
//                     setComment={setComment} 
//                     addNewComment={addNewComment}
//                     id={id} 
//                     topicRefetch = {listOfTopic.refetch}
//                     refetch={refetch} 
//                     setAddNewComment={setAddNewComment}/>
//                 <FadeIn>
//                     {(data.length === 0) ? "there are no comment" : data.map((eachData) => (
//                         <IndividualComment key={eachData.commentId} commentRefetch={refetch} data={eachData}/>
//                     ))}
//                 </FadeIn>
//             </div>
            
//         )
//     }
// }

function Topic() {
    // const listOfTopic = useQuery(['allTopics'], () => fetchListOfTopics());
    const {id} = useParams();
    const singleTopic = useQuery(['singleTopic'], () => fetchSingleTopic(id))
    
    const {data, isLoading, error, refetch} = useQuery(['allComments'], 
    () => fetchListOfComments(id), {enabled: false});

    const [addNewComment, setAddNewComment] = useState(false);
    // const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        refetch();
        // getUserInfo().then(res => {
        //     if (res.status === 200) setIsSignedIn(true);
        // })
    }, [])

    const [comment, setComment] = useState("");
    

    if (isLoading || singleTopic.isLoading) return "loading";
    else if (error || singleTopic.error) return error.message;
    else {
        const theTopic = singleTopic.data.data[0];
        return (
            data && theTopic  && <div className="commentContainer">
                
                <LogBtn isSignedIn={singleTopic.data.user}/>
                <CommentHeader topicRefetch={singleTopic.refetch}
                    addNewComment={addNewComment} 
                    theTopic={theTopic} 
                    setAddNewComment={setAddNewComment}/>
                <NewCommentSection 
                    comment={comment} 
                    setComment={setComment} 
                    addNewComment={addNewComment}
                    id={id} 
                    topicRefetch = {singleTopic.refetch}
                    refetch={refetch} 
                    setAddNewComment={setAddNewComment}/>
                <FadeIn>
                    {(data.length === 0) ? "there are no comment" : data.map((eachData) => (
                        <IndividualComment key={eachData.commentId} commentRefetch={refetch} data={eachData}/>
                    ))}
                </FadeIn>
            </div>
            
        )
    }
}

export default Topic;