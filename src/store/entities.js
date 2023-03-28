import { combineReducers } from "redux";
import usersReducer from "./users";
import farmsReducer from "./farms";
import plantsReducer from "./plants";


export default combineReducers({
  users: usersReducer,
  farms: farmsReducer,
  plants : plantsReducer,
});
