import React from 'react';
import LogOut from './logOutBtn';
import { LogIn } from '../page/signInPage';
import PropTypes from 'prop-types'; 

function LogBtn(props) {
    return (
        <>
            {props.user && 
                <LogOut className="logOIBtn"/>
            }
            {!props.user && <LogIn className="logOIBtn"/>}
        </>
    )
}

LogBtn.propTypes = {
    user: PropTypes.object
}

export default LogBtn;