import { combineReducers } from "redux";
import usersReducer from "./users";
import farmsReducer from "./farms";
import plantsReducer from "./plants";
import counterSlice from "./slices/counterSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";


export default combineReducers({
  users: usersReducer,
  farms: farmsReducer,
  plants : plantsReducer,
  counter:counterSlice,
  products:productSlice,
  cart:cartSlice
});
