import { combineReducers } from 'redux'
import user from './user';
import { routerReducer as routing } from 'react-router-redux'

const rootReducer = combineReducers({
  user,
  routing,
});

export default rootReducer;
