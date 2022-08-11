import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/combindReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export default function configureStore(initialState) {
    const store = createStore(
      reducer,
      initialState,
      compose(applyMiddleware(...middlewares))
    );
    sagaMiddleware.run(rootSaga);
  
    return store;
  }