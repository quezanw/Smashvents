import auth from '../apis/auth';
import events from '../apis/events';
import history from '../history';

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: false
  }
}

export const openModal = config => {
  return {
    type: 'OPEN_MODAL',
    payload: config
  }
}

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL',
    payload: null
  }
}

export const selectEvent = event => {
  return {
    type: 'VIEW_EVENT',
    payload: event
  }
}


export const createUser = formValues => async (dispatch, getState) => {
  // const { userId } = getState().auth;
  const response = await auth.post('/register', formValues);
  dispatch({ type: 'CREATE_USER', payload: response.data });
  history.push('/');
}

export const loginUser = formValues => async (dispatch, getState) => {
  const response = await auth.post('/login', formValues);
  dispatch({ type: 'LOGIN_USER', payload: response.data });
  history.push('/');
}

export const getAllEvents = () => async (dispatch, getState) => {
  const response = await events.get('/all');
  // console.log(response.data.rows)
  dispatch({type: 'FETCH_ALL_EVENTS', payload: response.data.rows});
  history.push('/');
}