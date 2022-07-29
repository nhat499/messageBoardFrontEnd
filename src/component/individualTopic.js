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
                  if (res.status === 200) props.topicRefetch();
                  else alert(res.message);
                })
              }}> {data.numLikes} likes</button>}


              {(data.liked === 1) && <button className="unlikeBtn" onClick={()=> {
                  //// unlike topic
                  deleteLikesTopicCommentReply(data.topicId, 'topic')
                  .then(res=> {
                    if (res.status === 200)props.topicRefetch();
                    else alert(res.message);
                  })
              }}>{data.numLikes} likes</button>}

              <p className='numCommentLike'> {data.numComments + " comment"} </p>
              <button onClick={()=> {
                removeTopic(data.topicId, userId).then((res)=> {
                  if(res.status === 200) {
                    props.topicRefetch();
                    if (props.isCommentPage) navigate(-1);
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
        setCurrTopic={setCurrTopic}
        topicId={data.topicId}
        topicRefetch={props.topicRefetch}
        setEdit={setEdit}/>
      </>
    )
}
IndiviualTopic.propTypes = {
  data: PropTypes.object,
  topicRefetch: PropTypes.func,
  isCommentPage: PropTypes.bool
}

export default IndiviualTopic;