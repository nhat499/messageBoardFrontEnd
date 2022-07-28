import React from 'react';
import {SERVER_URL} from '../util/variables.js'

function LogOut() {
    return(
        <>
        <button className='LogOutBtn' onClick={()=> {
            window.location.href = `${SERVER_URL}/signOut/start`
        }} >Log Out</button>
        </>
    )
}

export default LogOut;