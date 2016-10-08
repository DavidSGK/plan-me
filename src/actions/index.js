import * as User from '../constants/user';

export const logInSuccess = payload => ({
  type: User.LOG_IN_SUCCESS,
  payload,
});

export const logOutSuccess = () => ({
  type: User.LOG_OUT_SUCCESS,
});
