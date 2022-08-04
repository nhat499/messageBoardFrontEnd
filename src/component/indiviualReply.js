import React, {useState} from "react";
import {
    removeReply,
    updateReply, 
    insertLikesTopicCommentReply,
    deleteLikesTopicCommentReply
} from '../queries/fetchQueries.js';
import PropTypes from 'prop-types';
import DateTime from "./dateTimeComponent.js";

function IndividualReply(props) {
    const data = props.data;
    const [edit, setEdit] = useState(false);
    const [reply, setReply] = useState(data.reply);
    const userId = 1; // GET FROM COOKIES
    return (
        <>
        {!edit && <div className='IndividualReply'>
                <img className="profileImg" src={data.profileImg}/>
                <div className="info">
                    <div className="topicCommentHeader">
                        <p><strong>{data.firstName} {data.lastName}</strong></p>
                        <DateTime timePost={data.timePost}/>
                    </div>
                    <p>{data.reply}</p>
                    <div className="replyNameBtn">
                        
                        {!edit && <div className="deleteEditReply">
                            <div className="replyBtn">
                                {(data.liked === 0) && <button onClick={() => {
                                    insertLikesTopicCommentReply(data.replyId, 'reply')
                                    .then(res=> {
                                        if (res.status === 200) {
                                            //props.refetch();
                                            props.socket.emit('replyUpdated');
                                        }else alert(res.message);
                                    })
                                }}>{data.numLikes} likes</button>}

                                {(data.liked === 1) && <button className="unlikeBtn" onClick={()=> {
                                    deleteLikesTopicCommentReply(data.replyId, 'reply')
                                    .then(res=> {
                                        if (res.status === 200) {
                                            //props.refetch();
                                            props.socket.emit('replyUpdated');
                                        } else alert(res.message);
                                    })
                                }}>{data.numLikes} likes</button>}
                            </div>
                            <div>
                                <button onClick={()=> setEdit(true)}>edit</button>
                                <button onClick={()=>{
                                    removeReply(data.replyId, userId).then((res) => {                              
                                        if (res.status === 200) { 
                                            //props.refetch();
                                            //props.commentRefetch();
                                            props.socket.emit('replyUpdated');
                                            props.socket.emit('commentUpdated'); 
                                        } else alert(res.message);
                                    });   
                                }}>delete</button>
                            </div>
                        </div>}

                    </div>
                </div>
        </div>}

        {edit && <div className="editReply">
            <textarea value={reply} onChange={(event) => setReply(event.target.value)}></textarea>
            <button onClick={()=> {
                updateReply(reply, data.replyId).then((res)=> {
                    if (res.status === 200) {
                        //props.refetch();
                        props.socket.emit('replyUpdated');
                    } else alert(res.message);
                    setEdit(false);
                })
            }}>submit</button>
            <button onClick={()=> setEdit(false)}>cancel</button>
            </div>}
        </>
        
    )
}

IndividualReply.propTypes = {
    data: PropTypes.object,
    refetch: PropTypes.func,
    commentRefetch: PropTypes.func,
    socket: PropTypes.object
}

export default IndividualReply;