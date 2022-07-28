
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<SignInPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/topic/:id' element={<Topic authed={true}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;