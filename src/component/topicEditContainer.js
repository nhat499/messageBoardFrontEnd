import React from "react";
import {updateTopic} from '../queries/fetchQueries.js';
import PropTypes from 'prop-types';

function EditContainer(props) {
    const userId = 1; // GET FROM COOKIES
    return (
      <>
        {props.edit && <div className="IndiviualTopic">
        <textarea value={props.currTopic} onChange={(e) => {
          props.setCurrTopic(e.target.value);
        }}/>
        <button onClick={() =>{
          updateTopic(props.currTopic, props.topicId, userId).then((res)=> {
            if(res.status === 200) {
              props.topicRefetch();
              console.log(props);
              props.socket.emit('singleTopicRefetch');
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
    topicRefetch: PropTypes.func,
    socket: PropTypes.object,
    setEdit: PropTypes.func
  }

export default EditContainer;