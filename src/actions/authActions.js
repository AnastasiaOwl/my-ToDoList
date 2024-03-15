import { SET_LOGGED_IN_USER } from './actionTypes';

export const setLoggedInUser = (isLoggedIn) => ({
  type: SET_LOGGED_IN_USER,
  payload: isLoggedIn,
});