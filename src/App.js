
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
//import {SERVER_URL} from './util/variables.js'
console.log(process.env.SERVER_URL);
const socket = io.connect('http://34.216.189.30');

function App() {
  return (
    <Router>
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