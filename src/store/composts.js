import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "composts",
  initialState: {
    list: [],
    sellerComposts:[],
    compostToUpdate:{},
    compostDetails:{},
    loading: false,
  },
  reducers: {
    populateComposts(composts, action) {
      composts.list=action.payload;
    },
    populateSellerComposts(composts, action) {
      composts.sellerComposts=action.payload;
    },

    setCompostToUpdate(state, action){
      state.compostToUpdate=action.payload;
    },
    setCompostDetails(state, action){
      state.compostDetails=action.payload;
    },
    updateCompost(state, action) {
      const { id, updatedCompost } = action.payload;
      const compostIndex = state.list.findIndex((compost) => compost._id === id);
      if (compostIndex !== -1) {
        state.list[compostIndex] = updatedCompost;
      }
    },

  },
});

export const {
  populateComposts,
  populateSellerComposts,
  setCompostToUpdate,
  setCompostDetails,
  updateCompost,
} = slice.actions;

export default slice.reducer;

