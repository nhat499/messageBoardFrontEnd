import React from "react";
import PropTypes from "prop-types";
import {
    updateComment,
} from '../queries/fetchQueries.js';

function EditCommentTextArea(props) {
    const data = props.data;
    return (

        <div className="editComment">
            <textarea 
                value={props.comment} 
                onChange={(e) => props.setComment(e.target.value)}>
            </textarea>
            {<button onClick={()=> {
                // submitUpdateComment(comment, data.commentId, props.commentRefetch, props.socket);
                updateComment(props.comment, data.commentId).then((res) => {
                    if (res.status === 200) {
                        //commentRefetch();
                        props.socket.emit('commentUpdated');
                        // props.socket.emit('singleTopicRefetch');
                        // props.socket.emit('topicUpdated');
                    } else alert(res.message)
                })
                props.setEditComment(false);
                }}>submit
            </button>}

            {<button onClick={() => {
                props.setEditComment(false);}}>cancel
            </button>}
        </div>
        
    )
}

EditCommentTextArea.propTypes = {
    comment: PropTypes.string,
    setComment: PropTypes.func,
    data:PropTypes.object,
    setEditComment: PropTypes.func,
    editComment:PropTypes.bool,
    socket:PropTypes.object
}

export default EditCommentTextArea;