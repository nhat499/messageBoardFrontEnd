import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
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
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import topicsSliceReducer from './rtksaga/state'
import { getTopicSaga } from './rtksaga/saga';

const reducers = combineReducers({
  topics: topicsSliceReducer,
})

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: reducers,
  middleware: [saga]
})
saga.run(getTopicSaga);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
