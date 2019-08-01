import {
	LOGOUT,
	LOGIN_PENDING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	REGISTRATION_PENDING,
	REGISTRATION_SUCCESS,
	REGISTRATION_ERROR
} from '../actions/types';

const INITIAL_STATE = {
	user_id: null,
	isSigninPending: false,
	isSignedIn: false,
	isSignedOut: true,
	loginError: null,
	registrationPending: false,
	registerationSuccess: false,
	registerationError: null
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case LOGOUT:
			return {
				...state,
				user_id: null,
				isSigninPending: false,
				isSignedIn: false,
				isSignedOut: true,
				loginError: null,
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
				user_id: action.payload.user_id,
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
				loginError: action.payload.error
			}
		case REGISTRATION_PENDING:
			return {
				...state,
				registrationPending: true,
				registerationSuccess: false,
				registerationError: null
			}
		case REGISTRATION_SUCCESS:
			return {
				...state,
				registrationPending: false,
				registerationSuccess: true,
				registerationError: null
			}
		case REGISTRATION_ERROR:
				return {
					...state,
					registrationPending: false,
					registerationSuccess: false,
					registerationError: action.payload.error
				}
		default:
			return state;
	}
}