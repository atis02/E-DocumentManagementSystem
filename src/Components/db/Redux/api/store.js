import {configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/ReduxSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
    },
}
)