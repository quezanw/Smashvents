import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import modalReducer from './modalReducer';
import selectEventReducer from './selectedEventReducer';

export default combineReducers({
  auth: userReducer,
  form: formReducer,
  events: eventsReducer,
  modal: modalReducer,
  event: selectEventReducer
});