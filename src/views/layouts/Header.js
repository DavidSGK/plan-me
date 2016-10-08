import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';

const headerStyle = {
  position: 'fixed',
};

const Header = ({isLoggedIn}) => (
  <AppBar
    style={headerStyle}
    title="Can U Plan Me"
    showMenuIconButton={isLoggedIn}
  />
);

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Header);
