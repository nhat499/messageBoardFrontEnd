import React, {useState} from "react";
import {
    removeReply,
    updateReply, 
    insertLikesTopicCommentReply,
    deleteLikesTopicCommentReply
} from '../queries/fetchQueries.js';
import PropTypes from 'prop-types';


function IndividualReply(props) {
    const data = props.data;
    const [showOption, setshowOption] = useState(false)
    const [edit, setEdit] = useState(false);
    const [reply, setReply] = useState(data.reply);
    const userId = 1; // GET FROM COOKIES
    return (
        <>
        {!edit && <div className='IndividualReply' 
        onMouseEnter={()=> {setshowOption(true)}} 
        onMouseLeave={()=> {setshowOption(false)}}>
                <p>{data.reply}</p>
                <div className="replyNameBtn">
                    <p>-{data.firstName} {data.lastName}</p>
                    {!edit && showOption && <div className="deleteEditReply">
                        {(data.liked === 0) && <button onClick={() => {
                            insertLikesTopicCommentReply(data.replyId, 'reply')
                            .then(res=> {
                                if (res.status === 200) props.refetch();
                                else alert(res.message);
                            })
                        }}>{data.numLikes} likes</button>}

                        {(data.liked === 1) && <button className="unlikeBtn" onClick={()=> {
                            deleteLikesTopicCommentReply(data.replyId, 'reply')
                            .then(res=> {
                                if (res.status === 200) props.refetch();
                                else alert(res.message);
                            })
                        }}>{data.numLikes} likes</button>}

                        <button onClick={()=> setEdit(true)}>edit</button>
                        <button onClick={()=>{
                            removeReply(data.replyId, userId).then((res) => {                              
                                if (res.status === 200) props.refetch()
                                else alert(res.message);
                            });   
                        }}>delete</button>
                    </div>}
                </div>
        </div>}
        {edit && <div className="IndividualReply">
            <textarea value={reply} onChange={(event) => setReply(event.target.value)}></textarea>
            <button onClick={()=> {
                updateReply(reply, data.replyId).then((res)=> {
                    if (res.status === 200) props.refetch();
                    alert(res.message);
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
    refetch: PropTypes.func
}

export default IndividualReply;