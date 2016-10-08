// if this does not exist we direct the user to the setup page
// We will retrieve this info from firebase when the user logins in

import { mergeAll, pick } from 'ramda';
import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  UPDATE_PRIORITIES,
} from '../constants/user';

export const pickUserInfo = pick(['displayName', 'email', 'photoURL']);

const initialState = {
  isLoggedIn: false,
  // a list of tags
  priorities: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRIORITIES: {
      return merge(state, priorities: action.payload);
    }

    case LOG_IN_SUCCESS: {
      return mergeAll([
        state,
        pickUserInfo(action.payload.user),
        { isLoggedIn: true }
      ]);
    }

    case LOG_OUT_SUCCESS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default user;
