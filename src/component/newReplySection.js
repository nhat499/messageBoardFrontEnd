import React from "react";
import PropTypes from 'prop-types';
import { insertNewReply } from "../queries/fetchQueries";
import TextareaAutosize from 'react-textarea-autosize';

function NewReplySection(props) {
    return (
        <div className="NewReplySection">
            <TextareaAutosize maxLength='255' value={props.reply} onChange={(event) => {
                props.setreply(event.target.value);
            }}/>
            <button onClick={() => {
                if(props.reply) {
                insertNewReply(props.reply, props.commentId).then((res)=> {
                    if(res.status === 200) {
                        //props.refetch();
                        //props.commentRefetch();
                        props.socket.emit('replyUpdated');
                        props.socket.emit('commentUpdated');
                    } else alert(res.message);
                });
                props.setaddNewReply(false);
                props.setreply("");
            }
            }}>submit</button>
            <button onClick={()=> {
                
                props.setaddNewReply(false);
                }}>cancel</button>
        </div>
    )
}
NewReplySection.propTypes = {
    reply: PropTypes.string,
    commentId: PropTypes.number,
    refetch: PropTypes.func,
    setaddNewReply: PropTypes.func,
    setreply: PropTypes.func,
    commentRefetch: PropTypes.func,
    socket: PropTypes.object
}

export default NewReplySection;