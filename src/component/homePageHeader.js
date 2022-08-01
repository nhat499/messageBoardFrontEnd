import React from "react";
import PropTypes from 'prop-types'; 
import LogBtn from "./logBtn";
import SearchContainer from "./searchComponent";

function HomePageHeader(props) {
    return (
        <div className='header'>
            <div className="searchLogBtn">
                <SearchContainer setSearch={props.setSearch}/>
                <LogBtn user={props.user}/>
            </div>
            
            <h2>List of Topics</h2>
            <button id='addNewTopicBtn' onClick={() => {
                    props.setAddNewTopic(true);
                }}>Add new Topic</button>
        </div>
    )
}

HomePageHeader.propTypes = {
    setAddNewTopic: PropTypes.func,
    user: PropTypes.object,
    setSearch: PropTypes.func
}

export default HomePageHeader;