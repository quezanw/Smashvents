import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import eventsReducer from './eventsReducer';
import modalReducer from './modalReducer';
import selectEventReducer from './selectedEventReducer';

export default combineReducers({
  registration: signupReducer,
  login: loginReducer,
  form: formReducer,
  events: eventsReducer,
  modal: modalReducer,
  event: selectEventReducer
});