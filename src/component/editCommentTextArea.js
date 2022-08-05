import React from "react";
import PropTypes from "prop-types";
import {
    updateComment,
} from '../queries/fetchQueries.js';
import TextareaAutosize from 'react-textarea-autosize';

function EditCommentTextArea(props) {
    const data = props.data;
    return (
        <div className="editComment">
            <TextareaAutosize 
                maxLength="255"
                value={props.comment} 
                onChange={(e) => props.setComment(e.target.value)}/>
            {<button onClick={()=> {
                updateComment(props.comment, data.commentId).then((res) => {
                    if (res.status === 200) {
                        props.socket.emit('commentUpdated');
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