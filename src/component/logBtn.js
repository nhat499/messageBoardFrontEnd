import React from 'react';
import LogOut from './logOutBtn';
import { LogIn } from '../page/signInPage';
import PropTypes from 'prop-types'; 

function LogBtn(props) {
    return (
        <div className="logBtn">
            {props.user && 
            <>
                <p>Hello {props.user.firstName}!</p>
                <LogOut className="logOIBtn"/>
            </>}
            {!props.user && <LogIn className="logOIBtn"/>}
        </div>
    )
}

LogBtn.propTypes = {
    user: PropTypes.object
}

export default LogBtn;