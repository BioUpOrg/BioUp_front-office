import { combineReducers } from "redux";
import usersReducer from "./users";
import farmsReducer from "./farms";


export default combineReducers({
  users: usersReducer,
  farms: farmsReducer
});
