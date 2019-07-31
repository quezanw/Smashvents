import { LOGIN, LOGOUT, CREATE_USER } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  id: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOGIN:
     return {...state, id:action.payload, isSignedIn: true };
    case LOGOUT:
    return {...state, id: null, isSignedIn: false };
     default:
      return state;
  }
}