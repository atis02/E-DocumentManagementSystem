import {applyMiddleware, combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/ReduxSlice'
import { thunk } from "redux-thunk";

const loggerMiddleware = (store) => (next) => (action) => {
    const dispatchStart = Date.now();
    console.groupCollapsed(`dispatching action: ${action.type}`);
    console.log('action:', action);
  
    const result = next(action); // Call the next middleware in the chain
  
    const dispatchEnd = Date.now();
    console.log(`time elapsed: ${dispatchEnd - dispatchStart} ms`);
    console.groupEnd();
  
    return result;
  };
  const reducer = combineReducers({auth:authReducer})
const middleware = applyMiddleware(loggerMiddleware)
export const store =createStore(
    reducer,
   middleware 

)