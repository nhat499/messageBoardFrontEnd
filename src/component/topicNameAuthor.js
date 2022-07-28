import React from "react";
import PropTypes from 'prop-types';
import DateTime from "./dateTimeComponent";
import {Link} from 'react-router-dom'

function TopicNameAuthor(props) {
    const data = props.data;
    return (
      <div className="TopicNameAuthor">
        <Link  style={{textDecoration: 'none'}} to={`/topic/` + data.topicId}>
          <p className='topic'>{data.topicId}. <strong>{data.topic}</strong></p>
        </Link>
       <div>
        {/* <p> {data.timePost} </p> */}
        <DateTime timePost={data.timePost}/>
        <p className='authorName'>{`by: ${data.firstName} ${data.lastName}`}</p>
       </div>
      </div>
    )
}
TopicNameAuthor.propTypes = {
  data: PropTypes.object
}

export default TopicNameAuthor;