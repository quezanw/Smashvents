import {
	LOGOUT,
	LOGIN_PENDING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	REGISTRATION_PENDING,
	REGISTRATION_SUCCESS,
	REGISTRATION_ERROR,
	CLEAR_LOGIN_REG
} from '../actions/types';


const INITIAL_STATE = {
	user_id: null,
	isSigninPending: false,
	isSignedIn: false,
	isSignedOut: true,
	loginError: null,
	registrationPending: false,
	registrationSuccess: false,
	registrationError: null
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case LOGOUT:
			return {
				...state,
				...INITIAL_STATE
			}
		case LOGIN_PENDING:
			return {
				...state,
				user_id: null,
				isSigninPending: true,
				isSignedIn: false,
				isSignedOut: true
			}
		case LOGIN_SUCCESS:
			return {
				...state, 
				user_id: action.payload,
				isSigninPending: false,
				isSignedIn: true, 
				isSignedOut: false, 
				loginError: null
			}
		case LOGIN_ERROR:
			return {
				...state,
				user_id: null,
				isSigninPending: false,
				isSignedIn: false, 
				isSignedOut: true, 
				loginError: action.payload
			}
		case REGISTRATION_PENDING:
			return {
				...state,
				registrationPending: true,
				registrationSuccess: false,
				registrationError: null
			}
		case REGISTRATION_SUCCESS:
			return {
				...state,
				registrationPending: false,
				registrationSuccess: true,
				registrationError: null
			}
		case REGISTRATION_ERROR:
      return {
        ...state,
        registrationPending: false,
        registrationSuccess: false,
        registrationError: action.payload
      }
		case CLEAR_LOGIN_REG:
			return {
				...state,
				loginError: null,
				registrationError: null,
				registrationSuccess: false
			}
		default:
			return state;
	}
}