import { combineReducers } from "redux";
import usersReducer from "./users";
import compostsReducer from "./composts";
import farmsReducer from "./farms";
import plantsReducer from "./plants";
import counterSlice from "./slices/counterSlice";
import productSlice from "./slices/productSlice";
import cartReducer from "./cart";
import animalsReducer from "./animals";
import shipmentSlice from "./shipment";

export default combineReducers({
  users: usersReducer,
  farms: farmsReducer,
  plants : plantsReducer,
  counter:counterSlice,
  products:productSlice,
  cart:cartReducer,
  shipment:shipmentSlice,
  animals: animalsReducer,
  composts: compostsReducer,
});
