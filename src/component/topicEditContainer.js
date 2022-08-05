import React from "react";
import {updateTopic} from '../queries/fetchQueries.js';
import PropTypes from 'prop-types';

function EditContainer(props) {
    return (
      <>
        {props.edit && <div className="IndiviualTopic">
        <textarea maxLength='255' value={props.currTopic} onChange={(e) => {
          props.setCurrTopic(e.target.value);
        }}/>
        <button onClick={() =>{
          updateTopic(props.currTopic, props.topicId).then((res)=> {
            if(res.status === 200) {
              // if (props.topicRefetch() !== undefined) props.topicRefetch();
              // if(props.allTopicRefetch() !== undefined) props.allTopicRefetch();
              props.socket.emit('singleTopicRefetch');
              props.socket.emit('topicUpdated');
            } else alert(res.message);
            props.setEdit(false);
    
          })
        }}>submit</button>
        <button onClick={()=> props.setEdit(false)}>cancel</button>
        </div>}
      </>
    )
  }
  
  EditContainer.propTypes = {
    edit: PropTypes.bool,
    currTopic: PropTypes.string,
    setCurrTopic: PropTypes.func,
    topicId: PropTypes.number,
    allTopicRefetch: PropTypes.func,
    socket: PropTypes.object,
    setEdit: PropTypes.func,
    isCommentPage: PropTypes.bool,
    topicRefetch: PropTypes.func
  }

export default EditContainer;