import auth from '../apis/auth';
import events from '../apis/events';
import history from '../history';

import { 
  LOGOUT,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTRATION_PENDING,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  OPEN_MODAL,
  CLOSE_MODAL,
  VIEW_EVENT,
  CREATE_EVENT,
  FETCH_ALL_EVENTS
}
from './types';

export const openModal = config => {
  return {
    type: OPEN_MODAL,
    payload: config
  }
}

export const closeModal = () => {
  history.push('/')
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

export const logout = () => {
  return {
    type: LOGOUT,
    payload: false
  }
}

export const register = formValues => async (dispatch, getState) => {
  // const { userId } = getState().auth;
  dispatch({type: REGISTRATION_PENDING});
  const response = await auth.post('/register', formValues);
  console.log(response);
  // if(!response.data.error) {
  //   dispatch({ type: REGISTRATION_SUCCESS})
  //   history.push('/');
  // } else {
  //   dispatch({type: REGISTRATION_ERROR, payload: response.data.error})
  // }
}

export const login = formValues => async (dispatch, getState) => {
  dispatch({ type: LOGIN_PENDING});
  const response = await auth.post('/login', formValues);
  console.log(response);
  // if(!response.data.error) {
  //   dispatch({ type: REGISTRATION_SUCCESS})
  //   history.push('/');
  // } else {
  //   dispatch({type: REGISTRATION_ERROR, payload: response.data.error})
  // }
}

export const createEvent = formValues => async (dispatch, getState) => {
  const response = await events.post('/new', {...formValues, user_id: 1});
  dispatch({ type: CREATE_EVENT, payload: response.data });
}

export const getAllEvents = () => async (dispatch, getState) => {
  const response = await events.get('/all');
  // console.log(response.data.rows)
  dispatch({type: FETCH_ALL_EVENTS, payload: response.data.rows});
  history.push('/');
}