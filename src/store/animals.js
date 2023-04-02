import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

//import moment from "moment";

const slice = createSlice({
  name: "animals",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    animalsRequested: (animals, action) => {
      animals.loading = true;
    },

    animalsReceived: (animals, action) => {
      if (Array.isArray(action.payload)) {
        animals.list = action.payload;
      } else {
        animals.list = [];
      }
      animals.loading = false;
      animals.lastFetch = Date.now();
    },

    animalsRequestFailed: (animals, action) => {
      animals.loading = false;
    },


    // command - event
    // addAnimal -animalAdded
   animalAdded: (animals, action) => {
      animals.list.push(action.payload);
    },


      animalUpdated: (animals, action) => {
        const index = animals.list.findIndex((animal) => animal._id === action.payload._id);
        if (index !== -1) {
          animals.list[index] = action.payload;
        }
      },
    animalDeleted: (animals, action) => {
      animals.list = animals.list.filter((animal) => animal._id !== action.payload);
    },

  }
});

export const {
 animalAdded,
  animalsReceived,
  animalUpdated,
  animalsRequested,
  animalDeleted,
  animalsRequestFailed
} = slice.actions;
export default slice.reducer;

// Action Creators
//const baseUrl = "/animals";


export const addAnimal =animal => 
  apiCallBegan({
    url: "/animals/add",
    method: "post",
    data:animal,
    onSuccess:animalAdded.type,
    onError: animalsRequestFailed.type
  });
;

export const getAnimals = () =>
  apiCallBegan({
    url: "/animals",
    method: "get",
    onStart: animalsRequested.type,
    onSuccess: animalsReceived.type,
    onError: animalsRequestFailed.type
  });

  export const updateAnimal = (data, id) =>
  apiCallBegan({
    url: `/animals/${id}`,
    method: "patch",
    data,
    onSuccess: animalUpdated.type,
    onError: animalsRequestFailed.type,
  });
 



  export const deleteAnimal = (id) =>
  apiCallBegan({
    url: `/animals/${id}`,
    method: "delete",
    onSuccess: animalDeleted.type,
    onError: animalsRequestFailed.type,
  });