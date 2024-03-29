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
import wishlistReducer from "./wishlist";
import contractsReducer from "./contracts";
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
  wishList: wishlistReducer,
  contracts: contractsReducer,
  
});
