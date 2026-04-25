import { combineReducers } from "@reduxjs/toolkit";
import authreducer from '../slices/authSlice';
import cartreducer from '../slices/Cartslice'
import profilereducer from '../slices/ProfileSlice'
import courseReducer from '../slices/Courseslice'
import viewcoursereducer from "../slices/Viewcourse"

const rootreducer=combineReducers({
    auth:authreducer,
    profile:profilereducer,
    cart:cartreducer,
    course:courseReducer,
    viewcourse:viewcoursereducer
})

export default rootreducer;