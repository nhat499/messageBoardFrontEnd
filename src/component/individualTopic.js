import React, { useEffect, useState } from "react";
import '../App.css';
import PropTypes from 'prop-types';
import EditContainer from "./topicEditContainer";
import TopicNameAuthor from "./topicNameAuthor";


const IndiviualTopic = (props) => {
    const data = props.data;
    const socket = props.socket;
    const [edit, setEdit] = useState(false);
    const [currTopic, setCurrTopic] = useState(data.topic);
    useEffect(()=> {
      setCurrTopic(props.data.topic);
    },[props.data])
    return (
      <>
      {!edit && <div className='IndiviualTopic'>
          <TopicNameAuthor 
            data={data} 
            setEdit={setEdit} 
            socket={props.socket} 
            isCommentPage={props.isCommentPage}/>
      </div>}
        <EditContainer 
        edit={edit} 
        currTopic={currTopic} 
        isCommentPage={props.isCommentPage}
        setCurrTopic={setCurrTopic}
        topicId={data.topicId}
        allTopicRefetch={props.allTopicRefetch}
        topicRefetch={props.topicRefetch}
        socket={socket}
        setEdit={setEdit}/>
      </>
    )
}
IndiviualTopic.propTypes = {
  data: PropTypes.object,
  topicRefetch: PropTypes.func,
  isCommentPage: PropTypes.bool,
  socket: PropTypes.object,
  allTopicRefetch: PropTypes.func
}

export default IndiviualTopic;