import {insertNewComment} from '../queries/fetchQueries.js'
import React from "react";
import PropTypes from 'prop-types';
import IndividualComment from "./individualComment";
import CommentHeader from "./commentHeader";
import TextareaAutosize from 'react-textarea-autosize';

function NewCommentSection(props) {
    return (
        <>
        {(props.addNewComment) && 
                <div className='NewCommentSection'>
                    <TextareaAutosize maxLength='255' value={props.comment} onChange={(event)=> {
                        props.setComment(event.target.value);
                    }}/>
                    <div>
                    <button onClick={() => {
                        if (props.comment)
                        insertNewComment(props.comment, props.id).then((res)=>{
                            if(res.status === 200){
                                //props.refetch();
                                //props.topicRefetch();
                                props.socket.emit('commentUpdated');
                                props.socket.emit('singleTopicRefetch');
                                props.socket.emit('topicUpdated');
                            } else alert(res.message);
                        });
                        props.setComment("");
                        props.setAddNewComment(false);
                        }}>submit</button>
                    <button onClick={() => props.setAddNewComment(false)}>cancel</button>
                    </div>
                </div>
                }
        </>
    )
}

NewCommentSection.propTypes = {
    comment: PropTypes.string,
    setComment: PropTypes.func,
    addNewComment: PropTypes.bool,
    topicRefetch: PropTypes.func,
    setAddNewComment: PropTypes.func,
    id: PropTypes.string,
    refetch: PropTypes.func,
    socket: PropTypes.object
}

export {NewCommentSection, CommentHeader, IndividualComment}