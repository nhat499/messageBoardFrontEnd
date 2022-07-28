import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";
import {fetchListOfReply} from '../queries/fetchQueries.js';
import IndividualReply from "./indiviualReply.js";
import PropTypes from 'prop-types';
import NewReplySection from "./newReplySection.js";
import FadeIn from "react-fade-in/lib/FadeIn.js";

function ReplyContainer(props) {
    const {data, status, error, refetch} = useQuery(['allReplies' + props.commentId], 
    () => fetchListOfReply(props.commentId), {enabled:false}); //{enabled:false}

    const [addNewReply, setaddNewReply] = useState(false);
    const [reply, setreply] = useState("");
    useEffect(()=> {
        refetch();
    },[]);

    if (status === "loading") return 'is loading...';
    if (error) return 'error: ' + error.message;
    return (
        <div className='ReplyContainer'>
            <FadeIn>
                {(data.length === 0) ? "There are no reply" : data.map((eachData) => (
                    <IndividualReply refetch={refetch} key={eachData.replyId} data={eachData}/>
                ))}
            </FadeIn>
            
            { !addNewReply && <button 
                onClick={() => setaddNewReply(true)}>add new reply</button>}
            {addNewReply && <NewReplySection 
                commentRefetch={props.commentRefetch}
                refetch={refetch}
                commentId={props.commentId}
                reply={reply} 
                setreply={setreply} 
                setaddNewReply={setaddNewReply}/>}
            
        </div>
    )
}
ReplyContainer.propTypes = {
    commentId: PropTypes.number,
    commentRefetch: PropTypes.func
}

export default ReplyContainer;