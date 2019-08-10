import auth from '../apis/auth';
import events from '../apis/events';
import attendees from '../apis/attendees';
import history from '../history';
import { reset } from 'redux-form';

import { 
  LOGOUT,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTRATION_PENDING,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  CLEAR_LOGIN_REG,
  OPEN_MODAL,
  CLOSE_MODAL,
  VIEW_EVENT,
  CREATE_EVENT,
  FETCH_ALL_EVENTS,
  EVENT_ERROR
}
from './types';

export const openModal = config => {
  return {
    type: OPEN_MODAL,
    payload: config
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
    payload: null
  }
}

export const selectEvent = event => {
  return {
    type: VIEW_EVENT,
    payload: event
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}

export const clearLoginReg = () => (dispatch) => {
  dispatch({ type: CLEAR_LOGIN_REG });
}

export const register = formValues => async (dispatch, getState) => {
  dispatch({type: REGISTRATION_PENDING});
  const response = await auth.post('/register', formValues);
  if(!response.data.error) {
    dispatch({ type: REGISTRATION_SUCCESS});
    dispatch(reset('registerForm'));
  } else {
    dispatch({type: REGISTRATION_ERROR, payload: response.data.error})
  }
}

export const login = formValues => async (dispatch, getState) => {
  dispatch({ type: LOGIN_PENDING});
  const response = await auth.post('/login', {...formValues});
  if(!response.data.error) {
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user_id});
    dispatch({ type: CLOSE_MODAL });
  } else {
    dispatch({type: LOGIN_ERROR, payload: response.data.error});
  }
}

export const createEvent = formValues => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  const response = await events.post('/new', {...formValues, user_id});
  if(!response.data.error) {
    console.log(response.data)
    dispatch({ type: CREATE_EVENT, payload: response.data });
    dispatch(reset('eventForm'));
    dispatch({ type: VIEW_EVENT, payload: response.data.event })
    history.push(`/event/${response.data.event.title}/details`);
  } else {
    dispatch({ type: EVENT_ERROR, payload: response.data.error});
  }
}

export const getAllEvents = () => async (dispatch, getState) => {
  const response = await events.get('/all');
  dispatch({type: FETCH_ALL_EVENTS, payload: response.data.rows});
  history.push('/');
}

// export const joinEvent = event_id => async (dispatch, getState) => {
//   const { user_id } = getState().auth;
//   const response = await attendees.post('/join', {event_id, user_id});

// }