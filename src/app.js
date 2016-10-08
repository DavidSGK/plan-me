import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { orange500, grey800 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createStore from './store';
import Routes from './routes';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { auth } from './firebase/config';
import { logInSuccess } from './actions';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
    primary2Color: orange500,
    primary3Color: orange500,
    textColor: grey800,
  },
});

const store = createStore();

const unsubscribe = auth.onAuthStateChanged(user => {
  store.dispatch(logInSuccess({user}));
  unsubscribe();
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store} >
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
