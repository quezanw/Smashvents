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
  TOTAL_ATTENDEES,
  FETCH_ATTENDEE_PAGE,
  FETCH_ATTENDING_EVENTS,
  FETCH_HOSTED_EVENTS,
  FETCH_HOST,
  CREATE_EVENT,
  EDIT_EVENT,
  FETCH_ALL_EVENTS,
  EVENT_ERROR,
  PROFILE_SETTINGS_SUCCESS,
  PROFILE_SETTINGS_PENDING,
  PROFILE_SETTINGS_ERROR
}
from './types';

const ATTENDEEE_DISPLAY_LIMIT = 9;

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
  dispatch({ type: VIEW_EVENT, payload: event });
  dispatch(getAttendees(event.event_id));
  dispatch(fetchHost(event.user_id));
  if(!event.online) {
    dispatch(getCoordinates(event.venue));
  }
}

export const getAttendees = event_id => async (dispatch, getState) => {
  // let response = await attendees.get(`/limit/${event_id}/${ATTENDEEE_DISPLAY_LIMIT}`);
  let response = await attendees.get(`/all/${event_id}`);
  dispatch({type: VIEW_ATTENDEES, payload: response.data});
  // dispatch(getAttendeesCount(event_id));
}

export const getAttendeesCount = event_id => async dispatch => {
  let response = await attendees.get(`/count/${event_id}`);
  dispatch({type: TOTAL_ATTENDEES, payload: response.data[0].count});
}

export const fetchAttendingEvents = user_id => async (dispatch, getState) => {
  let response = await events.get(`/attending/${user_id}`);
  dispatch({ type: FETCH_ATTENDING_EVENTS, payload: response.data.rows })
}

export const fetchAttendeeList = (event_id, offset) => async (dispatch) => {
  let response = await attendees.get(`/offset/${event_id}/${offset}`);
  dispatch({ type: FETCH_ATTENDEE_PAGE, payload: response.data });
}

export const fetchHostedEvents = user_id => async (dispatch) => {
  let response = await events.get(`/hosting/${user_id}`);
  dispatch({ type: FETCH_HOSTED_EVENTS, payload: response.data.rows })
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
    dispatch({ type: LOGIN_SUCCESS, payload: response.data});
    dispatch(reset('loginForm'));
    dispatch(closeModal());
    dispatch(fetchAttendingEvents(response.data.user_id));
    dispatch(fetchHostedEvents(response.data.user_id));
  } else {
    dispatch({type: LOGIN_ERROR, payload: response.data.error});
  }
}

export const editProfileSettings = formValues => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  dispatch({ type: PROFILE_SETTINGS_PENDING });
  const response = await auth.put('/edit/profile', {...formValues, user_id});
  if(!response.data.error) {
    dispatch({ type: PROFILE_SETTINGS_SUCCESS, payload: response.data.rows[0] });
    // dispatch(reset('profileForm'));
    // history.push('/profile/settings');
  } else {
    dispatch({ type: PROFILE_SETTINGS_ERROR, payload: response.data.error });
  }
}

export const editThemeColor = formValues => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  dispatch({ type: PROFILE_SETTINGS_PENDING });
  const response = await auth.put('/edit/theme_color', {...formValues, user_id});
  if(!response.data.error) {
    dispatch({ type: PROFILE_SETTINGS_SUCCESS, payload: response.data.rows[0] });
    dispatch(reset('themeForm'));
    history.push('/profile/settings');
  } else {
    dispatch({ type: PROFILE_SETTINGS_ERROR, payload: response.data.error });
  }
}

export const createEvent = formValues => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  const response = await events.post('/new', {...formValues, user_id});
  if(!response.data.error) {
    dispatch({ type: CREATE_EVENT, payload: response.data });
    dispatch(reset('eventForm'));
    dispatch(selectEvent(response.data.event));
    dispatch(fetchHostedEvents(user_id));
    history.push(`/event/${response.data.event.title}/details`);
  } else {
    dispatch({ type: EVENT_ERROR, payload: response.data.error});
  }
}

export const clearVenue = () => async (dispatch) => {
  dispatch(change('eventForm', 'venue', undefined))
}

export const editEvent = formValues => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  formValues.online = formValues.online === 'true';
  const response = await events.put('/edit', {...formValues});
  if(!response.data.error) {
    dispatch({ type: EDIT_EVENT, payload: response.data });
    dispatch(reset('eventForm'));
    dispatch(selectEvent(formValues));
    dispatch(fetchAttendingEvents(user_id));
    dispatch(fetchHostedEvents(user_id));
    history.push(`/event/${formValues.title}/details`);
  } else {
    dispatch({ type: EVENT_ERROR, payload: response.data.error});
  }
}

export const deleteEvent = event_id => async (dispatch, getState) => {
  let { user_id } = getState().auth; 
  const eventResponse = await events.delete(`/delete/${event_id}`);
  const attendeeResponse = await attendees.delete(`/event/delete/${event_id}`);
  dispatch(closeModal());
  dispatch(fetchAttendingEvents(user_id));
  dispatch(fetchHostedEvents(user_id));
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
  dispatch(fetchAttendingEvents(user_id));
  dispatch(fetchHostedEvents(user_id));
}

export const leaveEvent = (event_id) => async (dispatch, getState) => {
  const { user_id } = getState().auth;
  const response = await attendees.delete(`/leave/${user_id}/${event_id}`); 
  console.log(response)
  dispatch(closeModal());
  dispatch(getAttendees(event_id));
  dispatch(fetchAttendingEvents(user_id));
  dispatch(fetchHostedEvents(user_id));
}