import React from "react"
import PropTypes from 'prop-types';
import IndiviualTopic from "./individualTopic";
function CommentHeader(props) {
    return (
        <IndiviualTopic 
            socket={props.socket} 
            isCommentPage={true} 
            allTopicRefetch={props.allTopicRefetch} 
            topicRefetch={props.topicRefetch} 
            data = {props.theTopic}/> 
    )
}

CommentHeader.propTypes = {
    theTopic: PropTypes.object,
    addNewComment: PropTypes.bool,
    setAddNewComment: PropTypes.func,
    topicRefetch: PropTypes.func,
    socket: PropTypes.object,
    refetch: PropTypes.func,
    allTopicRefetch: PropTypes.func
}

export default CommentHeader;