import React from 'react';
import {signIn} from '../queries/fetchQueries.js'
import {getUserInfo} from '../queries/fetchQueries.js';
import {CLIENT_URL} from '../util/variables.js'
import PropTypes from 'prop-types';

function SignInPage() {
    getUserInfo().then((res) => {
        if (res.status === 200) { 
            window.location.replace(`/home`);
        }
    })
    return (
        <div className='signInPage'>
            <h1>Messaging Board</h1>
            {/* <button onClick={()=> {
                signIn().then((res)=> {
                    window.location.href = res.link;
                })
            }}>sign in with samsung</button> */}
            <LogIn className="bigSignInBtn"/>

            <a href={`${CLIENT_URL}/home/`}>Continunes Without Signing in</a>
        </div>

    )
}

function LogIn({className}) {
    return (
        <button className={className} onClick={()=> {
            signIn().then((res)=> {
                window.location.href = res.link;
            })
        }}>Sign-In</button>
    )
}

LogIn.propTypes = {
    className: PropTypes.string
}

export {SignInPage, LogIn};