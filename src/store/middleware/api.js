import axios from "axios";
import * as actions from "../api";

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: "http://localhost:3000/users",
      url,
      method,
      data
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    console.log("debbug",error);
    // General
   // dispatch(actions.apiCallFailed(error));
    // Specific
    if (onError) {
      console.log("entred On Eroor")
     // dispatch({ type: onError, payload: error.response.data.field });
     return error.response.data.field;
    }
  }
};

export default api;
