import React, {useEffect, useState} from "react";
import {
    updateComment, 
    deleteComment, 
    insertLikesTopicCommentReply,
    deleteLikesTopicCommentReply
} from '../queries/fetchQueries.js';
import PropTypes from 'prop-types';
import EditCommentTextArea from "./editCommentTextArea.js";
import ReplyContainer from './replyContainer.js'
import DateTime from "./dateTimeComponent.js";

function IndividualComment(props) {
    const data = props.data;
    const [viewReply, setViewReply] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [comment, setComment] = useState(data.theComment);
    const userId = 1; // GET FROM COOKIES LATER
    useEffect(() => {
        setComment(data.theComment);
    },[data])

    return (
        <>
        <div className='IndividualComment' data={data}>
            { !editComment && <div className='IndividualCommentInfo'>
                <p>{data.commentId}. {data.theComment}</p>
                {/* <p>{data.timePost}</p> */}
                <DateTime timePost={data.timePost}/>
                <p>{"-" + data.firstName + " " + data.lastName}</p>
            </div>}

            {editComment && <EditCommentTextArea 
                comment={comment} 
                setComment={setComment}
            />}

            <div>
                {(data.liked === 0) &&<button onClick={() => {
                    insertLikesTopicCommentReply(data.commentId, 'comment')
                    .then(res => {
                        if(res.status === 200) {
                            props.commentRefetch();
                            props.socket.emit('commentUpdated');
                        }
                        else alert(res.message);
                    })
                }}>{data.numLikes} likes</button>}

                {(data.liked === 1) && <button className="unlikeBtn" onClick={() => {
                    deleteLikesTopicCommentReply(data.commentId, 'comment')
                    .then(res => {
                        if (res.status === 200) {
                            props.commentRefetch();
                            props.socket.emit('commentUpdated');
                        }
                        else alert(res.message);
                    })
                }}>{data.numLikes} likes</button>}

                {editComment && 
                <button onClick={()=> {
                    submitUpdateComment(comment, data.commentId, props.commentRefetch, props.socket,setEditComment);}}>submit
                </button>}

                {editComment && <button onClick={() => {
                    setEditComment(false);}}>cancel
                </button>}

                {!editComment && 
                <button onClick={() => setEditComment(true)}>edit comment
                </button>}

                {!viewReply && !editComment && <button onClick={() => {
                    setViewReply(true);}}>view replies ({data.numReply})
                </button>}  

                {viewReply && !editComment && 
                <button onClick={() => {
                    setViewReply(false);}}>hide replies ({data.numReply})
                </button>}

                {!editComment && 
                <button onClick={()=> {
                    deleteComment(data.commentId, userId).then((res)=> {
                        if (res.status === 200) {
                            props.commentRefetch();
                            props.socket.emit('commentUpdated');
                        }
                        else alert(res.message);
                    });}}>delete
                </button>}
            </div>
        </div>
            {viewReply && <ReplyContainer 
                socket = {props.socket}
                commentRefetch={props.commentRefetch} 
                numReply={data.numReply} 
                commentId={data.commentId}/>}
        </>
    )
}


IndividualComment.propTypes = {
    data: PropTypes.object,
    commentRefetch: PropTypes.func,
    socket: PropTypes.object
}

function submitUpdateComment(comment, commentId, setEditComment, socket, commentRefetch ) {
    updateComment(comment, commentId).then((res) => {
        if (res.status === 200) {
            commentRefetch();
            socket.emit('commentUpdated');
        } else alert(res.message)
        setEditComment(false);
    })
}

export default IndividualComment;