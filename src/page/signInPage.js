import React from 'react';
import {signIn} from '../queries/fetchQueries.js'
import {getUserInfo} from '../queries/fetchQueries.js';
import {CLIENT_URL} from '../util/variables.js'


function SignInPage() {
    getUserInfo().then((res) => {
        if (res.status === 200) { 
            window.location.replace(`/home`);
        }
    })

    return (
        <>
            <h1>Please sign in with samsung</h1>
            <button onClick={()=> {
                signIn().then((res)=> {
                    window.location.href = res.link;
                })
            }}>sign in with samsung</button>

            <a href={`${CLIENT_URL}/home/`}>Contiunes without Signing in</a>
        </>

    )
}

function LogIn() {
    return (
        <button onClick={()=> {
            signIn().then((res)=> {
                window.location.href = res.link;
            })
        }}>Sign-In</button>
    )
}

export {SignInPage, LogIn};