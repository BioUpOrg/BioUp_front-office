import { createUser } from './UserReducer';

export const createUserAction = (user) => {
  return (dispatch) => {
    dispatch(createUser(user));
  }
}
