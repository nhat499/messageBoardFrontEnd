import React from "react";
import PropTypes from "prop-types";
function EditCommentTextArea(props) {
    return (
        <textarea 
            value={props.comment} 
            onChange={(e) => props.setComment(e.target.value)}></textarea>
    )
}

EditCommentTextArea.propTypes = {
    comment: PropTypes.string,
    setComment: PropTypes.func
}

export default EditCommentTextArea;