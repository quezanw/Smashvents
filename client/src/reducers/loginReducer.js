const INITIAL_STATE = {
  isSignedIn: null,
  id: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
     return {...state, id:action.payload, isSignedIn: true };
    case 'LOGOUT':
    return {...state, id: null, isSignedIn: false };
     default:
      return state;
  }
}