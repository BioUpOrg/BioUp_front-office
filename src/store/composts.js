import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "composts",
  initialState: {
    permanentList: [],
    list: [],
    sellerComposts: [],
    compostToUpdate: {},
    compostDetails: {},
    loading: false,
  },
  reducers: {
    populateComposts(composts, action) {
      composts.list = action.payload;
      composts.permanentList = action.payload;
    },
    populateSellerComposts(composts, action) {
      composts.sellerComposts = action.payload;
    },

    setCompostToUpdate(state, action) {
      state.compostToUpdate = action.payload;
    },
    setCompostDetails(state, action) {
      state.compostDetails = action.payload;
    },
    updateCompost(state, action) {
      const { id, updatedCompost } = action.payload;
      const compostIndex = state.list.findIndex(
        (compost) => compost._id === id
      );
      if (compostIndex !== -1) {
        state.list[compostIndex] = updatedCompost;
      }
    },

    filterCompostsByPrice(state, action) {
      const { minPrice, maxPrice } = action.payload;
      state.list = state.permanentList.filter((compost) => {
        return compost.unitPrice >= minPrice && compost.unitPrice <= maxPrice;
      });
    },

    filterCompostsByCategory(state, action) {
      const { type } = action.payload;
      if (type !== "all") {
        state.list = state.permanentList.filter((compost) => {
          return compost.type === type;
        });
      } else {
        state.list = state.permanentList;
      }
    },

    filterCompostsByNutrients(state, action) {
      const { nutrients } = action.payload;
      state.list = state.permanentList.filter((compost) => {
        // Assuming the 'nutrients' field is an array of nutrient names
        return nutrients.every((nutrient) =>
          compost.nutrients.includes(nutrient)
        );
      });
    },

    sortCompostsByPriceHighToLow(state, action) {
      state.list = [...state.list].sort((a, b) => b.unitPrice - a.unitPrice);
    },

    sortCompostsByPriceLowToHigh(state, action) {
      state.list = [...state.list].sort((a, b) => a.unitPrice - b.unitPrice);
    },

    sortCompostsByName_Aa_To_Zz(state, action) {
      state.list = [...state.list].sort((a, b) => a.name.localeCompare(b.name));
    },

    sortCompostsByName_Zz_To_Aa(state, action) {
      state.list = [...state.list].sort((a, b) => b.name.localeCompare(a.name));
    },
  },
});

export const {
  populateComposts,
  populateSellerComposts,
  setCompostToUpdate,
  setCompostDetails,
  updateCompost,
  filterCompostsByPrice,
  filterCompostsByCategory,
  filterCompostsByNutrients,
  sortCompostsByPriceHighToLow,
  sortCompostsByPriceLowToHigh,
  sortCompostsByName_Aa_To_Zz,
  sortCompostsByName_Zz_To_Aa,
} = slice.actions;

export default slice.reducer;
