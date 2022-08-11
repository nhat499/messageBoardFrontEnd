import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";
import {fetchListOfReply} from '../queries/fetchQueries.js';
import IndividualReply from "./indiviualReply.js";
import PropTypes from 'prop-types';
import NewReplySection from "./newReplySection.js";
import FadeIn from "react-fade-in/lib/FadeIn.js";
import {useSelector, useDispatch} from 'react-redux';
import * as types from '../redux/ActionTypes'

function ReplyContainer(props) {
    const socket = props.socket;
    // const {data, status, error, refetch} = useQuery(['allReplies' + props.commentId], 
    // () => fetchListOfReply(props.commentId), {enabled:false}); //{enabled:false}

    const dispatch = useDispatch();
    let data = useSelector(state=>state.getRepliesReducer);
    console.log(data);

    const [addNewReply, setaddNewReply] = useState(false);
    const [reply, setreply] = useState("");

    socket.on('replyUpdated', () => {
        //refetch();
    });
    useEffect(()=> {
        //refetch();
        dispatch({type: types.GET_REPLIES_REQUEST, payload:{commentId: props.commentId}})
    },[]);

    // if (status === "loading") return 'is loading...';
    // if (error) return 'error: ' + error.message;
    if (!data.isLoading) {
        data = data.data;
        return (
            <div className='ReplyContainer'>
                <FadeIn>
                    {(data.length === 0) ? "There are no reply" : data.map((eachData) => (
                        <IndividualReply 
                            // refetch={refetch} 
                            socket={socket} 
                            commentRefetch={props.commentRefetch} 
                            key={eachData.replyId} 
                            data={eachData}/>
                    ))}
                </FadeIn>
                { !addNewReply && <button 
                    onClick={() => setaddNewReply(true)}>+ New Reply</button>}
                {addNewReply && <NewReplySection 
                    commentRefetch={props.commentRefetch}
                    socket={socket}
                    // refetch={refetch}
                    commentId={props.commentId}
                    reply={reply} 
                    setreply={setreply} 
                    setaddNewReply={setaddNewReply}/>}
            </div>
        )
    }
}
ReplyContainer.propTypes = {
    commentId: PropTypes.number,
    commentRefetch: PropTypes.func,
    socket: PropTypes.object
}

export default ReplyContainer;