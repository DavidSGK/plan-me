import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { logInSuccess, logOutSuccess } from '../../actions';
import { signIn, signOut } from '../../firebase/auth';
import { auth } from '../../firebase/config';

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

const headerStyle = {
  position: 'fixed',
};

const buttonStyle = {
  color: 'white',
  position: 'absolute',
  top: '50%',
  right: '1%',
  transform: 'translateY(-50%)',
};

const LogIn = ({dispatch}) => (
  <FlatButton style={buttonStyle} label="Login" onClick={onSignIn(dispatch)}/>  
);

const Logged = ({ dispatch }) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Settings" />
    <MenuItem primaryText="Sign out" onClick={onSignOut(dispatch)} />
  </IconMenu>
);

const Header = ({isLoggedIn, dispatch}) => (
  <AppBar
    title="Plan Me"
    showMenuIconButton={false}
    iconElementRight={
      isLoggedIn ? <Logged dispatch={dispatch} /> : <LogIn dispatch={dispatch} />
    }
    style={headerStyle}
  />
);

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
