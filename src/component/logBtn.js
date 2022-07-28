import React from 'react';
import LogOut from './logOutBtn';
import { LogIn } from '../page/signInPage';
import PropTypes from 'prop-types'; 

function LogBtn(props) {
    return (
        <div className="logBtn">
            {props.isSignedIn && <LogOut className="logOIBtn"/>}
            {!props.isSignedIn && <LogIn className="logOIBtn"/>}
        </div>
    )
}

LogBtn.propTypes = {
    isSignedIn: PropTypes.object
}

export default LogBtn;