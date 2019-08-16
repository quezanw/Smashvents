import auth from '../apis/auth';
import events from '../apis/events';
import attendees from '../apis/attendees';
import history from '../history';
import { reset } from 'redux-form';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { change } from 'redux-form';
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
  CALC_EVENT_COORDINATES,
  VIEW_ATTENDEES,
  FETCH_ATTENDING_EVENTS,
  FETCH_HOST,
  CREATE_EVENT,
  EDIT_EVENT,
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

export const getCoordinates = address => async (dispatch, getState) => {
  let geocode = await geocodeByAddress(address);
  let coords = await getLatLng(geocode[0]);
  dispatch({ type: CALC_EVENT_COORDINATES, payload: coords })
}

export const selectEvent = event => async (dispatch, getState) => {
  // console.log(event.online)
  if(!event.online) {
    dispatch(getCoordinates(event.venue));
  }
  dispatch({ type: VIEW_EVENT, payload: event });
  dispatch(getAttendees(event.event_id));
  dispatch(fetchHost(event.user_id))
}

export const getAttendees = event_id => async (dispatch, getState) => {
  let response = await attendees.get(`/event/${event_id}`);
  dispatch({type: VIEW_ATTENDEES, payload: response.data});
}

export const fetchAttendingEvents = user_id => async (dispatch, getState) => {
  let response = await events.get(`/attending/${user_id}`);
  dispatch({ type: FETCH_ATTENDING_EVENTS, payload: response.data.rows })
}

export const fetchHost = (user_id, event_id)=> async dispatch => {
  let response = await events.get(`/host/${user_id}`);
  dispatch({ type: FETCH_HOST, payload: response.data.rows[0] });
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
    dispatch(reset('loginForm'));
    dispatch({ type: CLOSE_MODAL });
    dispatch(fetchAttendingEvents(response.data.user_id));
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
    dispatch(selectEvent(response.data.event));
    history.push(`/event/${response.data.event.title}/details`);
  } else {
    dispatch({ type: EVENT_ERROR, payload: response.data.error});
  }
}

export const clearVenue = () => async (dispatch) => {
  dispatch(change('eventForm', 'venue', undefined))
}

export const editEvent = formValues => async (dispatch, getstate) => {
  // const { user_id } = getState().auth;
  formValues.online = formValues.online === 'true';
  const response = await events.put('/edit', {...formValues});
  if(!response.data.error) {
    dispatch({ type: EDIT_EVENT, payload: response.data });
    dispatch(reset('eventForm'));
    dispatch(selectEvent(formValues));
    history.push(`/event/${formValues.title}/details`);
  } else {
    dispatch({ type: EVENT_ERROR, payload: response.data.error});
  }
}

export const deleteEvent = event_id => async (dispatch, getState) => {
  let { user_id } = getState().auth; 
  const eventResponse = await events.delete(`/delete/${event_id}`);
  const attendeeResponse = await attendees.delete(`/event/delete/${event_id}`);
  dispatch({ type: CLOSE_MODAL });
  dispatch(fetchAttendingEvents(user_id));
  console.log(eventResponse, attendeeResponse);
  history.push('/');
}

export const getAllEvents = () => async (dispatch, getState) => {
  const response = await events.get('/all');
  dispatch({type: FETCH_ALL_EVENTS, payload: response.data.rows});
  history.push('/');
}

export const joinEvent = event_id => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  const response = await attendees.post('/join', {event_id, user_id});
  console.log(response)
  dispatch(getAttendees(event_id));
  dispatch(fetchAttendingEvents(user_id))
}

export const leaveEvent = (event_id) => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  const response = await attendees.delete(`/leave/${user_id}/${event_id}`); 
  console.log(response)
  dispatch(getAttendees(event_id));
  dispatch(fetchAttendingEvents(user_id));
}