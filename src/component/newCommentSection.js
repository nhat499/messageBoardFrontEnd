import {insertNewComment} from '../queries/fetchQueries.js'
import React from "react";
import PropTypes from 'prop-types';
import IndividualComment from "./individualComment";
import CommentHeader from "./commentHeader";

function NewCommentSection(props) {
    const userId = 1; // GET FROM COOKIES LATER
    return (
        <>
        {(props.addNewComment) && 
                <>
                <textarea value={props.comment} onChange={(event)=> {
                    props.setComment(event.target.value);
                }}></textarea>
                <div>
                <button onClick={() => {
                    if (props.comment)
                    insertNewComment(props.comment, props.id, userId).then((res)=>{
                        if(res.status === 200){
                            props.refetch();
                            props.topicRefetch();
                        } else alert(res.message);
                    });
                    props.setComment("");
                    props.setAddNewComment(false);
                    }}>submit</button>
                <button onClick={() => props.setAddNewComment(false)}>cancel</button>
                </div>
                </>
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
    refetch: PropTypes.func
}

export {NewCommentSection, CommentHeader, IndividualComment}