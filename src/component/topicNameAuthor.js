import React from "react";
import PropTypes from 'prop-types';
import DateTime from "./dateTimeComponent";
import {Link} from 'react-router-dom'
import TopicBtn from "./topicBtn";

function TopicNameAuthor(props) {
    const data = props.data;
    return (
      <div className="TopicNameAuthor">
        <img className="profileImg" alt="profileIcon" src={data.profileImg}/>
        <div className="info">
          <div className="topicCommentHeader">
            <p className='authorName'><strong>{data.firstName} {data.lastName}</strong></p>
            <DateTime timePost={data.timePost}/>
          </div>
          <Link style={{textDecoration: 'none'}} to={`/topic/` + data.topicId}>
            <p className='topic'>{data.topic}</p>
          </Link>
          <TopicBtn 
            data={data} 
            setEdit={props.setEdit} 
            socket={props.socket}
            isCommentPage={props.isCommentPage}/>
        </div>
      </div>
    )
}
TopicNameAuthor.propTypes = {
  data: PropTypes.object,
  setEdit: PropTypes.func,
  socket: PropTypes.object,
  isCommentPage: PropTypes.bool
}

export default TopicNameAuthor;