import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

//import moment from "moment";

const slice = createSlice({
  name: "plants",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    plantsRequested: (plants, action) => {
      plants.loading = true;
    },

    plantsReceived: (plants, action) => {
      if (Array.isArray(action.payload)) {
        plants.list = action.payload;
      } else {
        plants.list = [];
      }
      plants.loading = false;
      plants.lastFetch = Date.now();
    },

    plantsRequestFailed: (plants, action) => {
      plants.loading = false;
    },


    // command - event
    // addPlant -plantAdded
   plantAdded: (plants, action) => {
      plants.list.push(action.payload);
    },


      plantUpdated: (plants, action) => {
        const index = plants.list.findIndex((plant) => plant._id === action.payload._id);
        if (index !== -1) {
          plants.list[index] = action.payload;
        }
      },
    plantDeleted: (plants, action) => {
      plants.list = plants.list.filter((plant) => plant._id !== action.payload);
    },

  }
});

export const {
 plantAdded,
 plantResolved,
  plantsReceived,
  plantUpdated,
  plantsRequested,
  plantDeleted,
  plantsRequestFailed
} = slice.actions;
export default slice.reducer;

// Action Creators
//const baseUrl = "/plants";


export const addPlant =plant => 
  apiCallBegan({
    url: "/plants/add",
    method: "post",
    data:plant,
    onSuccess:plantAdded.type,
    onError: plantsRequestFailed.type
  });
;

export const getPlants = () =>
  apiCallBegan({
    url: "/plants",
    method: "get",
    onStart: plantsRequested.type,
    onSuccess: plantsReceived.type,
    onError: plantsRequestFailed.type
  });

  export const updatePlant = (data, id) =>
  apiCallBegan({
    url: `/plants/${id}`,
    method: "patch",
    data,
    onSuccess: plantUpdated.type,
    onError: plantsRequestFailed.type,
  });
 



  export const deletePlant = (id) =>
  apiCallBegan({
    url: `/plants/${id}`,
    method: "delete",
    onSuccess: plantDeleted.type,
    onError: plantsRequestFailed.type,
  });