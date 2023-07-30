import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
//import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useDispatch } from 'react-redux';



export const getUser = createAsyncThunk("authUser/getUser", async() =>{

    const response = await axios.get("/api/current_user").then((res) => res);
    if(response){
        return response.data;
    }
    else{
        console.log("error occured");
    }
    

})

export const handleToken = createAsyncThunk("authUser/handleToken", async (token) => {
    try {
      const response = await axios.post("/api/stripe", token);
      return response.data;
    } catch (error) {
      console.error("Error in token:", error);
      throw error;
    }
  });
  


const authUser = createSlice({
    name:'authUser',
    initialState: {
        users: [],
        loading: false,
        creditsloading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state,action) =>{
            state.loading =false
            state.users = action.payload;
            state.error = ''
            console.log('User data received:', state.users);
           // return action.payload || false
        })
        builder.addCase(getUser.pending, (state) =>{
            state.loading = true
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message;
        })
        builder.addCase(handleToken.fulfilled, (state,action) =>{
            state.creditsloading = false;
            state.users = action.payload;
            console.log("stripe token response is", action.payload);
        })
        builder.addCase(handleToken.pending, (state) => {
            state.creditsloading= true;
        })
        builder.addCase(handleToken.rejected, (state, action) => {
            state.creditsloading = false;
            state.error = action.error.message;
            console.log("error in getting token");
        })
    }
});
export default authUser.reducer