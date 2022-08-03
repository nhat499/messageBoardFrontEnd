import React, { useEffect, useState } from "react";
import '../App.css';
import {useNavigate} from 'react-router-dom'
// import {useQuery } from 'react-query'
// import {fetchListOfTopics} from '../queries/fetchQueries.js'
import PropTypes from 'prop-types';
import {
  removeTopic, 
  insertLikesTopicCommentReply,
  deleteLikesTopicCommentReply
} from '../queries/fetchQueries.js'
import EditContainer from "./topicEditContainer";
import TopicNameAuthor from "./topicNameAuthor";


const IndiviualTopic = (props) => {
    
    const navigate = useNavigate();
    const data = props.data;
    const socket = props.socket;
    const [edit, setEdit] = useState(false);
    const [currTopic, setCurrTopic] = useState(data.topic);
    const userId = 1; // GET FROM COOKIES
    useEffect(()=> {
      setCurrTopic(props.data.topic);
    },[props.data])
    return (
      <>
      {!edit && <div className='IndiviualTopic' /*onClick={moveToIndiviualTopicPage}*/>
          <TopicNameAuthor data={data}/>
          <div className='detailInfo'> 
              {!data.liked && <button onClick={() => {
                insertLikesTopicCommentReply(data.topicId, 'topic')
                .then(res=> {
                  if (res.status === 200) {
                      // props.topicRefetch();
                      // props.allTopicRefetch();
                    props.socket.emit('singleTopicRefetch');
                    props.socket.emit('topicUpdated');
                  } else alert(res.message);
                  
                })
              }}> {data.numLikes} likes</button>}


              {(data.liked === 1) && <button className="unlikeBtn" onClick={()=> {
                  //// unlike topic
                  deleteLikesTopicCommentReply(data.topicId, 'topic')
                  .then(res=> {
                    if (res.status === 200) {
                      // if (props.topicRefetch() !== undefined) props.topicRefetch();
                      // if(props.allTopicRefetch() !== undefined) props.allTopicRefetch();
                      
                      props.socket.emit('singleTopicRefetch');
                      props.socket.emit('topicUpdated');
                    } else alert(res.message);
                  })
              }}>{data.numLikes} likes</button>}

              <p className='numCommentLike'> {data.numComments + " comment"} </p>
              <button onClick={()=> {
                removeTopic(data.topicId, userId).then((res)=> {
                  if(res.status === 200) {
                    // props.allTopicRefetch();
                    if (props.isCommentPage) {
                      navigate('/home');
                    }
                    props.socket.emit('navigateBack')
                    props.socket.emit('topicUpdated');

                  } else alert(res.message);
                })
              }}>delete</button>
              <button onClick={()=> {
                setEdit(true);
              }}>edit topic</button>
          </div>
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