import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
//import moment from "moment";

const slice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
      users.lastFetch = Date.now();
    },

    usersRequestFailed: (users, action) => {
      users.loading = false;
    },


    // command - event
    // addUser - userAdded
    userAdded: (users, action) => {
      users.list.push(action.payload);
    },

  }
});

export const {
  userAdded,
  userResolved,
  usersReceived,
  usersRequested,
  usersRequestFailed
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/auth/";
/*
export const loadUsers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.users;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  return dispatch(
    apiCallBegan({
      url : "/list",
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type
    })
  );
};
*/

export const addUser = user =>
  apiCallBegan({
    url,
    method: "post",
    data: user,
    onSuccess: userAdded.type,
    onError: usersRequestFailed.type
  });
