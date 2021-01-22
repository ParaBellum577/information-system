import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { save, load } from "redux-localstorage-simple"
import reducers from './reducers';

const rootReducer = combineReducers(reducers);
// const oldState = loadState();
const store = createStore( rootReducer, load(), applyMiddleware(thunk, save()));
// const store = createStore( rootReducer, applyMiddleware(thunk));

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default function() {
  return store;
};