// if this does not exist we direct the user to the setup page
// We will retrieve this info from firebase when the user logins in

import { mergeAll, merge } from 'ramda';
import { genTags, sortTags } from '../personality';
import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  UPDATE_TAGS,
  UPDATE_CALENDAR,
} from '../constants/user';

const initialState = {
  isLoggedIn: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TAGS: {
      return merge(state, { tags: action.payload });
    }

    case LOG_IN_SUCCESS: {
      return mergeAll([
        state,
        action.payload.user,
        { isLoggedIn: true },
      ]);
    }

    case LOG_OUT_SUCCESS: {
      return initialState;
    }

    case UPDATE_CALENDAR: {
      console.warn(action.payload);
      return merge(
        state,
        { calendar: action.payload }
      );
    }

    default: {
      return state;
    }
  }
};

export default user;
