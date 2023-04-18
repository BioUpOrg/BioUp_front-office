import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "cart",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const payload = action.payload;
      const index = state.list.findIndex(
        (element) => element.cartItem._id == payload.cartItem._id
      );
      if (index !== -1) {
        state.list[index].quantity += 1;
      } else {
        state.list.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    increment: (state, action) => {
      const payload = action.payload;
      // debugger;
      const index = state.list.findIndex(
        (element) => element.cartItem._id == payload.cartItem._id
      );
      // debugger;
      if (index !== -1) {
        state.list[index].quantity += 1;
      } else {
        state.list.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    decrement: (state, action) => {
      const payload = action.payload;
      console.log(payload._id);
      // debugger;
      const index = state.list.findIndex(
        (element) => element.cartItem._id == payload.cartItem._id
      );
      if (index !== -1) {
        state.list[index].quantity -= 1;
        if (state.list[index].quantity === 0) {
          state.list.splice(index, 1);
        }
      }
    },
    remove: (state, action) => {
      const payload = action.payload;
      const index = state.list.findIndex(
        (element) => element.cartItem._id == payload.cartItem._id
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

export const { addItemToCart, increment, decrement, remove, clear } =
  slice.actions;

export const getCompostQuantityInCart = (state) => {
  const compostDetails = state.entities.composts.compostDetails;
  return (
    state.entities.cart.list?.find(
      (item) => item.cartItem._id == compostDetails._id
    )?.quantity || 0
  );
};
export const selectCart = (state) => {
  return state.entities.cart.list;
};

export const getCompostItemsCount = (state) => {
  return state.entities.cart.list?.reduce((count, item) => {
    if (item.type === "compost") {
      return count + 1;
    }
    return count;
  }, 0);
};

export const getBioProductsItemsCount = (state) => {
  return state.entities.cart.list?.reduce((count, item) => {
    if (item.type === "bio") {
      return count + 1;
    }
    return count;
  }, 0);
};

export const getCartItemsCount = (state) => {
  return state.entities.cart.list?.reduce((count, item) => {
    return count + 1;
  }, 0);
};

export const selectTotal = (state) => {
  // state.entities.cart.list?.map((elem, index) => {
  //   console.log("elem", elem);
  //   const originalPrice = elem.quantity * elem.cartItem.unitPrice;
  //   debugger;
  //   const discountAmount = originalPrice / 100 * elem.cartItem.discountOffered;
  //   debugger;
  //   const discountedPrice = originalPrice - discountAmount;
  //   debugger;
  //   const formattedPrice = discountedPrice.toFixed(2);
  //   debugger;

  // });

  return state.entities.cart.list?.reduce(
    // (a, b) => (a + b.quantity * b.cartItem.unitPrice - b.quantity * b.cartItem.unitPrice / 100 * b.cartItem.discountOffered),
    (a, b) => (a + b.quantity * b.cartItem.unitPrice),
    0
  );
};

export default slice.reducer;
