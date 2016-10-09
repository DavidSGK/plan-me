import * as User from '../constants/user';
import { has, allPass } from 'ramda';
import { push } from 'react-router-redux';
import { db } from '../firebase/config';

const logInRealSuccess = payload => ({
  type: User.LOG_IN_SUCCESS,
  payload,
});

const updateTags = tags => ({
  type: User.UPDATE_TAGS,
  payload: tags,
});

export const logInSuccess = payload => (dispatch, getState) => {
  dispatch(logInRealSuccess(payload));
  // check if the user has done the questionnaire
  db.ref(`users/${getState().user.uid}/tags`).once('value', snap => {
    const tags = snap.val();
    if (tags) {
      dispatch(updateTags(tags));
    } else {
      dispatch(push('/setup'));
    }
  });
};

export const logOutSuccess = () => ({
  type: User.LOG_OUT_SUCCESS,
});
