import { CREATE_USER,CURRENT_USER } from './actionTypes';
import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk(CREATE_USER, async (user) => {
    console.log("debug",user)
    try {
    const response = await axios.post('http://localhost:4000/users/auth/', user);
    return response.data;
        } catch (error) {
    return error.response.data;
  }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data:null,
        isError: false,
    },
    extraReducers:  (builder) => {
        builder.addCase(createUser.pending, (state,action) => {
            state.isLoading = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(createUser.rejected, (state,action) => {
           console.log("Error", action.payload);
           state.isError = true;
        });
    },
});

export default userSlice.reducer;
