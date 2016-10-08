import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { signIn, signOut } from '../firebase/auth';
import { auth } from '../firebase/config';
import { connect } from 'react-redux';
import { logInSuccess, logOutSuccess } from '../actions';

const main = {
  height: 100,
  width: 100,
};

const onSignIn = dispatch => () => {
  signIn(result => {
    dispatch(logInSuccess(result));
  });
};

const onSignOut = dispatch => () => {
  signOut(() => {
    dispatch(logOutSuccess());
  });
};

const Home = ({dispatch}) => (
  <div>
    <Paper style={main} zDepth={1} />
    <Paper style={main} zDepth={2} />
    <button onClick={onSignIn(dispatch)}>Sign in</button>
    <button onClick={onSignOut(dispatch)}>Sign out</button>
  </div>
);

Home.propType = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Home);
