import { logInSuccess, logOutSuccess } from '../actions';
import { signIn, signOut } from '../firebase/auth';

/**
 * @param {func} cb - to do after a successful login
 */
export const onSignIn = (dispatch, cb) => () => {
  signIn(result => {
    dispatch(logInSuccess(result));
    cb(dispatch)();
  });
};

export const onSignOut = dispatch => () => {
  signOut(() => {
    dispatch(logOutSuccess());
  });
};

