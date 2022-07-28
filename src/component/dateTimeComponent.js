import React from "react";
import PropTypes from 'prop-types';
import timeSince from "../util/timeFormat";

function DateTime(props) {
    const timePost = props.timePost;
    const datePosted = new Date(timePost);
    const dateNow = new Date(Date.now())
    const timeAgo = timeSince(dateNow - datePosted);
    return (
        <p>{timeAgo}</p>
    )
}

DateTime.propTypes = {
    timePost: PropTypes.string
}

export default DateTime;