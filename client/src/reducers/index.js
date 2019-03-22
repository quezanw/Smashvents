import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  registration: signupReducer,
  login: loginReducer,
  form: formReducer
});