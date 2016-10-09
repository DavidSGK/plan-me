import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { amber500, orange500, orange50 } from 'material-ui/styles/colors';
import { onSignIn } from '../utils/auth';
import { push } from 'react-router-redux';

const tryBtnStyle = {
  margin: '20px 0 0 10px',
};

const main = {
  height: '100%',
  width: '100%',
  //colors are amber500, orange500
  background: 'linear-gradient(to bottom right, #FFD54F, #F57C00)',
};

const title = {
  fontSize: '200%',
  width: '75%',
  height: '10%',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  margin: 'auto',
};

const titleColor = {
  color: 'white',
};

const subtitleColor = {
  color: orange50,
};

const logo = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: '50%',
  margin: 'auto',
  transform: 'rotate(30deg)',
};

export const goToDashboard = dispatch => () => {
  dispatch(push('/dashboard'));
};

const Home = ({ dispatch, isLoggedIn }) => (
  <div>
    <Paper style={main} zDepth={2}>
      <div style={title}>
        <span style={titleColor}><h1>Plan Me</h1></span>
        <span style={subtitleColor}><h5>Take the management out of time management.</h5></span>
        <RaisedButton
          style={tryBtnStyle}
          label="Try it out"
          primary
          onClick={!isLoggedIn ? onSignIn(dispatch, goToDashboard) : goToDashboard(dispatch)}
        />
      </div>
      <img style={logo} src="/assets/Logo.svg" width="28%"></img>
    </Paper>
  </div>
);

Home.propType = {
  dispatch: PropTypes.func.isRequired,
};

const mapToStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapToStateToProps)(Home);
