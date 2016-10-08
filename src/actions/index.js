import * as User from '../constants/user';
import { has, allPass } from 'ramda';
import { push } from 'react-router-redux';

const hasAllParams = allPass([
  has('occupation'),
  has('priorities'),
]);

export const logInSuccess = payload => (dispatch, getState) => {
  if (!hasAllParams(getState().user)) {
    dispatch(push('/setup'));
  }
  return {
    type: User.LOG_IN_SUCCESS,
    payload,
  };
};

export const logOutSuccess = () => ({
  type: User.LOG_OUT_SUCCESS,
});
