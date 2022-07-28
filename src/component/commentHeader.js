import React from "react"
import PropTypes from 'prop-types';
import IndiviualTopic from "./individualTopic";
function CommentHeader(props) {
    return (
        <>
        <IndiviualTopic isCommentPage={true} topicRefetch={props.topicRefetch} data = {props.theTopic}/>
        {(!props.addNewComment) && <button onClick={
            ()=> props.setAddNewComment(true)}>add new comment</button>}
        </>
    )
}

CommentHeader.propTypes = {
    theTopic: PropTypes.object,
    addNewComment: PropTypes.bool,
    setAddNewComment: PropTypes.func,
    topicRefetch: PropTypes.func
}

export default CommentHeader;