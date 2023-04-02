import { combineReducers } from "redux";
import usersReducer from "./users";
import farmsReducer from "./farms";
import plantsReducer from "./plants";
import animalsReducer from "./animals";


export default combineReducers({
  users: usersReducer,
  farms: farmsReducer,
  plants : plantsReducer,
  animals: animalsReducer,
});
