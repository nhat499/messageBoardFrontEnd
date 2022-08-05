import React, {useEffect, useState} from "react";
import {
    insertLikesTopicCommentReply,
    deleteLikesTopicCommentReply,
    deleteComment
} from '../queries/fetchQueries.js';
import PropTypes from 'prop-types';
import EditCommentTextArea from "./editCommentTextArea.js";
import ReplyContainer from './replyContainer.js'
import DateTime from "./dateTimeComponent.js";
import {BiTrash, BiEdit} from 'react-icons/bi';


function IndividualComment(props) {
    const data = props.data;
    const [viewReply, setViewReply] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [comment, setComment] = useState(data.theComment);
    useEffect(() => {
        setComment(data.theComment);
    },[data])
    return (
        <>
        <div className='IndividualComment' data={data}>
            {!editComment && <img className="profileImg" src={data.profileImg}/>}

            {<div className='IndividualCommentInfo'>
                {!editComment && <div className="topicCommentHeader">
                    <p><strong>{data.firstName} {data.lastName}</strong></p>
                    <DateTime timePost={data.timePost}/>
                </div>}
                {!editComment && <p>{data.theComment}</p>}

                <div className="commentBtn">

                    {!editComment && <div className="likesrepliesBtn">
                        {(data.liked === 0) &&<button onClick={() => {
                            insertLikesTopicCommentReply(data.commentId, 'comment')
                            .then(res => {
                                if(res.status === 200) {
                                    //props.commentRefetch();
                                    props.socket.emit('commentUpdated');
                                }
                                else alert(res.message);
                            })
                        }}>{data.numLikes} likes</button>}

                        {(data.liked === 1) && <button className="unlikeBtn" onClick={() => {
                            deleteLikesTopicCommentReply(data.commentId, 'comment')
                            .then(res => {
                                if (res.status === 200) {
                                    //props.commentRefetch();
                                    props.socket.emit('commentUpdated');
                                }
                                else alert(res.message);
                            })
                        }}>{data.numLikes} likes</button>}

                        {!viewReply && <button onClick={() => {
                            setViewReply(true);}}>view replies ({data.numReply})
                        </button>}  

                        {viewReply &&
                        <button onClick={() => {
                            setViewReply(false);}}>hide replies ({data.numReply})
                        </button>}
                    </div>}
                    
                <div>
                    {!editComment && 
                    <BiEdit className="clickIcon" onClick={() => setEditComment(true)}>edit comment
                    </BiEdit>}

                    {!editComment && 
                    <BiTrash className="clickIcon" onClick={()=> {
                        deleteComment(data.commentId).then((res)=> {
                            if (res.status === 200) {
                                //props.commentRefetch();
                                props.socket.emit('commentUpdated');
                                props.socket.emit('singleTopicRefetch');
                                props.socket.emit('topicUpdated');
                            } else alert(res.message);
                        });}}>delete
                    </BiTrash>}
                </div>

                    {editComment && <EditCommentTextArea 
                        setEditComment={setEditComment}
                        comment={comment} 
                        setComment={setComment}
                    />}

                </div>
            </div>}





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

// function submitUpdateComment(comment, commentId, socket) {
//     updateComment(comment, commentId).then((res) => {
//         if (res.status === 200) {
//             //commentRefetch();
//             socket.emit('commentUpdated');
//             socket.emit('singleTopicRefetch');
//             socket.emit('topicUpdated');
//         } else alert(res.message)
//     })
// }

export default IndividualComment;