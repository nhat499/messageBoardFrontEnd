import React, {useState} from "react";
import PropTypes from 'prop-types';
import { insertTopic } from "../queries/fetchQueries";
import FadeIn from "react-fade-in/lib/FadeIn.js";


function TopicTextAreaComponent (props) {
    const [newTopic, setNewTopic] = useState('');
    const userId = 1; // GET FROM COOKIES
    if (props.isNotHidden)
        return (
            <FadeIn>
                <div className= "textAreaContainer">
                    <textarea 
                        value={newTopic} 
                        onChange={(event)=> {
                            setNewTopic(event.target.value);
                    }}/>
                    <button onClick={() => {
                        if (newTopic) {
                            insertTopic(newTopic, userId)
                            .then((res)=> {
                                if (res.status === 200) props.refetch();
                                else alert(res.message);
                            })
                        }
                        props.setAddNewTopic(false);
                        setNewTopic('');
                    }}>submit</button>
                    <button onClick={() => {props.setAddNewTopic(false)}}>cancel</button>
                </div>
            </FadeIn>
        )
}

TopicTextAreaComponent.propTypes = {
    isNotHidden: PropTypes.bool,
    setAddNewTopic: PropTypes.func,
    refetch: PropTypes.func
}

export default TopicTextAreaComponent;