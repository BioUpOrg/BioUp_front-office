import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "wishList",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    addItemToWishList: (state, action) => {
      const payload = action.payload;
      const index = state.list.findIndex(
        (element) => element._id == payload._id
      );
      if (index === -1) {
        state.list.push({
            ...payload,
          });}
    },

    remove: (state, action) => {
      const payload = action.payload;
      const index = state.list.findIndex(
        (element) => element._id == payload._id
      );
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },

    clear: (state) => {
      state.list = [];
    },
  },
});

export const { addItemToWishList, remove, clear } =
  slice.actions;

export const selectWishList = (state) => {
    debugger;
    const d= state.entities.wishList.list;
    debugger;
  return state.entities.wishList.list;
};

export const getCompostItemsCount = (state) => {
  return state.entities.wishList.list?.reduce((count, item) => {
    if (item.type === "compost") {
      return count + 1;
    }
    return count;
  }, 0);
};

export const getBioProductsItemsCount = (state) => {
  return state.entities.wishList.list?.reduce((count, item) => {
    if (item.type === "bio") {
      return count + 1;
    }
    return count;
  }, 0);
};

export const getWishListItemsCount = (state) => {
  return state.entities.wishList.list?.reduce((count, item) => {
    return count + 1;
  }, 0);
};


export default slice.reducer;
