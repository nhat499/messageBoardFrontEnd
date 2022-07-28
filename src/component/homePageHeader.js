import React from "react";
import PropTypes from 'prop-types'; 
import LogBtn from "./logBtn";

function HomePageHeader(props) {
    return (
        <div className='header'>
            {/* <div className="logBtn">
                {props.isSignedIn && <LogOut className="logOIBtn"/>}
                {!props.isSignedIn && <LogIn className="logOIBtn"/>}
            </div> */}
            <LogBtn isSignedIn={props.isSignedIn}/>
            <h2>List of Topics</h2>
            <button id='addNewTopicBtn' onClick={() => {
                    props.setAddNewTopic(true);
                }}>Add new Topic</button>
        </div>
    )
}

HomePageHeader.propTypes = {
    setAddNewTopic: PropTypes.func,
    isSignedIn: PropTypes.object
}

// function logBtn() {
//     <div className="logBtn">
//     {props.isSignedIn && <LogOut className="logOIBtn"/>}
//     {!props.isSignedIn && <LogIn className="logOIBtn"/>}
// </div>
// }

export default HomePageHeader;