import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    increment: (state, action) => {
      const payload = action.payload;
      console.log("payload", payload);
      const index = state.cart.findIndex((item) => item.id === payload.id);
      console.log("index 1 ", index);
      if (index !== -1) {
        console.log("index 1 ", index);
        state.cart[index].quantity += 1;
      } else {
        console.log("index 3 ", index);
        state.cart.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    decrement: (state, action) => {
      const payload = action.payload;
      const index = state.cart.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.cart[index].quantity -= 1;
        if (state.cart[index].quantity === 0) {
          state.cart.splice(index, 1);
        }
      }
    },
    remove: (state, action) => {
      const payload = action.payload;
      const index = state.cart.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    empty: (state) => {
      state.cart = [];
    },
  },
});
export const { increment, decrement, remove, empty } = cartSlice.actions;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.cart.value)`
export const selectCountOf = (state, payload) => {
  return (
    state.cart.cart?.find((item) => item.id === payload.id)?.quantity || 0
  );
};
export const selectCountAll = (state) => {
  return state.cart.cart?.reduce((a, b) => a + b.quantity, 0);
};
export const selectTotal = (state) => {
  return state.cart.cart?.reduce((a, b) => a + b.quantity * b.price, 0);
};
export const selectCart = (state) => {
  return state.cart.cart;
};
export default cartSlice.reducer;
