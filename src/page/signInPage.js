import React, { useState } from 'react';
import {signIn} from '../queries/fetchQueries.js'
import {getUserInfo} from '../queries/fetchQueries.js';
import {CLIENT_URL} from '../util/variables.js'


function SignInPage() {
    const [expire, setExpire] = useState(false);
    getUserInfo().then((res) => {
        console.log("rrrrres ", res);
        if (res.status === 200) { 
            console.log("resresr ", res);
            window.location.replace(`${CLIENT_URL}/home`);
        } else if (res.status === 466) {
            setExpire(true);
        }
    })

    return (
        <>
            { expire && <p>session has expire</p>}
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
        }}>sign in with samsung</button>
    )
}

export {SignInPage, LogIn};