// if this does not exist we direct the user to the setup page
// We will retrieve this info from firebase when the user logins in

import { LOG_IN_SUCCESS, UPDATE_PRIORITIES } from '../constants/user';

const initialState = {
  isLoggedIn: false,
  // a list of tags
  priorities: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRIORITIES: {
      return { ...state, priorities: action.payload };
    }

    case LOG_IN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }

    default: {
      return state;
    }
  }
};

export default user;
