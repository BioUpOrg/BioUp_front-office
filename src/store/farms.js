import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

//import moment from "moment";

const slice = createSlice({
  name: "farms",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    farmsRequested: (farms, action) => {
      farms.loading = true;
    },

    farmsReceived: (farms, action) => {
      farms.list = action.payload;
      farms.loading = false;
      farms.lastFetch = Date.now();
    },

    farmsRequestFailed: (farms, action) => {
      farms.loading = false;
    },


    // command - event
    // addFarm -farmAdded
   farmAdded: (farms, action) => {
      farms.list.push(action.payload);
    },

  }
});

export const {
 farmAdded,
 farmResolved,
  farmsReceived,
  farmsRequested,
  farmsRequestFailed
} = slice.actions;
export default slice.reducer;

// Action Creators
//const baseUrl = "/farms";


export const addFarm =farm => 
  apiCallBegan({
    url: "/farms/add",
    method: "post",
    data:farm,
    onSuccess:farmAdded.type,
    onError: farmsRequestFailed.type
  });
;

export const getFarms = () =>
  apiCallBegan({
    url: "/farms",
    method: "get",
    onStart: farmsRequested.type,
    onSuccess: farmsReceived.type,
    onError: farmsRequestFailed.type
  });