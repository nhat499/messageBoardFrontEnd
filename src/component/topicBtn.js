import React from "react";
import {
    insertLikesTopicCommentReply,
    deleteLikesTopicCommentReply,
    removeTopic
} from '../queries/fetchQueries.js';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {BiTrash, BiEdit} from 'react-icons/bi';

function TopicBtn(props) {
    const data = props.data;
    const navigate = useNavigate();
    return (
          <div className='detailInfo'> 
          <div className="LikeComment">
            {!data.liked && <button onClick={() => {
                insertLikesTopicCommentReply(data.topicId, 'topic')
                .then(res=> {
                if (res.status === 200) {
                    // props.topicRefetch();
                    // props.allTopicRefetch();
                    props.socket.emit('singleTopicRefetch');
                    props.socket.emit('topicUpdated');
                } else alert(res.message);
                
                })
            }}> {data.numLikes} likes</button>}


            {(data.liked === 1) && <button className="unlikeBtn" onClick={()=> {
                //// unlike topic
                deleteLikesTopicCommentReply(data.topicId, 'topic')
                .then(res=> {
                    if (res.status === 200) {
                    // if (props.topicRefetch() !== undefined) props.topicRefetch();
                    // if(props.allTopicRefetch() !== undefined) props.allTopicRefetch();
                    
                    props.socket.emit('singleTopicRefetch');
                    props.socket.emit('topicUpdated');
                    } else alert(res.message);
                })
            }}>{data.numLikes} likes</button>}

            <button className='numCommentLike' onClick={()=> {
                window.location.href = '/topic/'+ data.topicId;
            }}> {data.numComments + " comment"} </button>
          </div>
          <div className="deleteEdit">
          <BiEdit className="clickIcon" onClick={()=> {
                props.setEdit(true);
            }}>edit topic</BiEdit>
            <BiTrash className="clickIcon "onClick={()=> {
                removeTopic(data.topicId).then((res)=> {
                if(res.status === 200) {
                    // props.allTopicRefetch();
                    if (props.isCommentPage) {
                    navigate('/home');
                    }
                    props.socket.emit('navigateBack')
                    props.socket.emit('topicUpdated');

                } else alert(res.message);
                })
            }}>delete</BiTrash>
          </div>
      </div>
    )
}

TopicBtn.propTypes = {
    data: PropTypes.object,
    setEdit: PropTypes.func,
    socket: PropTypes.object,
    isCommentPage: PropTypes.bool,
  }

export default TopicBtn;