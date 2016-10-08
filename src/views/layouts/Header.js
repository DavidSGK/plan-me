import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';

const Header = ({isLoggedIn}) => (
  <AppBar
    title="Can U Plan Me"
    showMenuIconButton={isLoggedIn}
  />
);

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Header);
