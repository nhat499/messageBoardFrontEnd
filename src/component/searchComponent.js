
import React from "react";
import PropTypes from 'prop-types'; 
import {BiSearch} from 'react-icons/bi';


function SearchContainer(props) {
    
    return (
        <div className="SearchContainer">
            <BiSearch className="biSearch"/>
            <input className="searchTopic" type="text" placeholder="search" onChange={(e) => {
                props.setSearch(e.target.value);
            }}></input>
        </div>

    )
}

SearchContainer.propTypes = {
    setSearch: PropTypes.func
}

export default SearchContainer;