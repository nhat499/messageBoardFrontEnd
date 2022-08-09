import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';

// // ACTION
// function increment() {
//   return {
//     name: 'INCREMENT'
//   }
// }

// function decrement() {
//   return {
//     name: 'DECREMENT'
//   }
// }

// // REDUCER
// function counter(state=0, action) {
//   switch(action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//   }
// }

// // STORE -> GLOBALIZED STATE
// import {createStore} from 'redux';
// let store = createStore(counter);

//     // display store in the console
//     store.subscribe(()=> { console.log(store.getState())});


// // DISPATCH
// store.dispatch(increment());

//import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import allReducer from './reducers';
import { Provider } from 'react-redux';
//const store = createStore(allReducer);
const store = configureStore({
  reducer:allReducer
})


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
