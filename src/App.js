
import './App.css';
import React from 'react';
import Topic from './page/singleTopicPage';
import {
  BrowserRouter as Router, 
  Routes, 
  Route,
} from 'react-router-dom';
import HomePage from './page/homePage.js';
import {SignInPage} from './page/signInPage.js';
import io from 'socket.io-client';
import {SERVER_URL, DEV_MODE} from './util/variables.js';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './actions/InDeCrement.js'
// const socket = io.connect(SERVER_URL,{path: '/api/socket.io',transports: ['websocket']});

console.log("dev mode: ", DEV_MODE);
// if (DEV_MODE){
const socket = io.connect(SERVER_URL, {transports: ['websocket']});
// }



function App() {
  const state = useSelector(state=>state);
  console.log(state);
  const counter = useSelector(state=> state.counter);
  const dispatch = useDispatch();
  return (
    <Router>
      <>hello, testing redux stuff [
      {counter}
      <button onClick={()=> dispatch(increment())}> increment </button>
      <button  onClick={()=> dispatch(decrement())}> decrement </button>]
      </>
      <div className="App">
        <Routes>
          <Route path='/' element={<SignInPage/>}/>
          <Route path='/home' element={<HomePage socket={socket}/>}/>
          <Route path='/topic/:id' element={<Topic socket={socket} authed={true}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;