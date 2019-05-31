import auth from '../apis/auth';
import events from '../apis/events'
import history from '../history';


export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: false
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