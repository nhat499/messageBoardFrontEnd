
import React from "react";
import PropTypes from 'prop-types'; 

function SearchContainer(props) {
    
    return (
        <>
        <input className="searchTopic" type="text" placeholder="search" onChange={(e) => {
            props.setSearch(e.target.value);
        }}></input>
        </>
    )
}

SearchContainer.propTypes = {
    setSearch: PropTypes.func
}

export default SearchContainer;