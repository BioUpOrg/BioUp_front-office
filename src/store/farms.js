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
      if (Array.isArray(action.payload)) {
        farms.list = action.payload;
      } else {
        farms.list = [];
      }
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


      farmUpdated: (farms, action) => {
        const index = farms.list.findIndex((farm) => farm._id === action.payload._id);
        if (index !== -1) {
          farms.list[index] = action.payload;
        }
      },
    farmDeleted: (farms, action) => {
      farms.list = farms.list.filter((farm) => farm._id !== action.payload);
    },

  }
});

export const {
 farmAdded,
 farmResolved,
  farmsReceived,
  farmUpdated,
  farmsRequested,
  farmDeleted,
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

  export const updateFarm = (data, id) =>
  apiCallBegan({
    url: `/farms/${id}`,
    method: "patch",
    data,
    onSuccess: farmUpdated.type,
    onError: farmsRequestFailed.type,
  });
 



  export const deleteFarm = (id) =>
  apiCallBegan({
    url: `/farms/${id}`,
    method: "delete",
    onSuccess: farmDeleted.type,
    onError: farmsRequestFailed.type,
  });