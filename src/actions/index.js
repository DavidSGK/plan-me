import * as User from '../constants/user';
import { has, allPass } from 'ramda';
import { push } from 'react-router-redux';

const hasAllParams = allPass([
  has('priorities'),
]);

const logInRealSuccess = payload => ({
  type: User.LOG_IN_SUCCESS,
  payload,
});

export const logInSuccess = payload => (dispatch, getState) => {
  // check if the user has done the questionnaire
  if (!hasAllParams(getState().user)) {
    dispatch(push('/setup'));
  }
  dispatch(logInRealSuccess(payload));
};

export const logOutSuccess = () => ({
  type: User.LOG_OUT_SUCCESS,
});
