import React from "react"
import PropTypes from 'prop-types';

function PageButton({pg, setPage, disabled}) {
    return <button onClick={() => setPage(pg)} disabled={disabled}>{pg}</button>
}

PageButton.propTypes = {
    pg: PropTypes.number,
    setPage: PropTypes.func,
    disabled: PropTypes.bool
}

export default PageButton;