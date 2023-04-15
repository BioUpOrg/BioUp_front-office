import { combineReducers } from "redux";
import usersReducer from "./users";
import compostsReducer from "./composts";

export default combineReducers({
  users: usersReducer,
  composts: compostsReducer,
});
