import { combineReducers } from "@reduxjs/toolkit";
import authreducer from '../slices/authSlice';
import cartreducer from '../slices/Cartslice'
import profilereducer from '../slices/ProfileSlice'
import courseReducer from '../slices/Courseslice'
const rootreducer=combineReducers({
    auth:authreducer,
    profile:profilereducer,
    cart:cartreducer,
    course:courseReducer
})

export default rootreducer;