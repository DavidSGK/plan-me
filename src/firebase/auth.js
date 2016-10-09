import Firebase from 'firebase';
import {auth} from './config';

const handleErrorDefault = error => {
  const errorCode = error.code;
  if (errorCode === 'auth/account-exists-with-different-credential') {
    alert('You have already signed up with a different auth provider for that email.');
  } else {
    console.error(error);
  }
};

/**
 * @param {func} handleSuccess - result -> void
 * @param {func} handleError - error -> void
 *
 * @returns {void}
 *
 */

export function signIn(handleSuccess, handleError = handleErrorDefault) {
  if (!auth.currentUser) {
    const provider = new Firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    auth.signInWithPopup(provider)
      .then(handleSuccess)
      .catch(handleError);
  }
}

export function signOut(handleSuccess) {
  if (auth.currentUser) {
    auth.signOut();
    handleSuccess();
  }
}
