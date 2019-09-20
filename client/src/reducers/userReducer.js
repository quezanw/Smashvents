import {
	LOGOUT,
	LOGIN_PENDING,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	REGISTRATION_PENDING,
	REGISTRATION_SUCCESS,
	REGISTRATION_ERROR,
	CLEAR_LOGIN_REG,
	FETCH_ATTENDING_EVENTS,
	FETCH_HOSTED_EVENTS,
	PROFILE_SETTINGS_SUCCESS,
	PROFILE_SETTINGS_PENDING,
	PROFILE_SETTINGS_ERROR
} from '../actions/types';


const INITIAL_STATE = {
	user_id: null,
	first_name: null,
	last_name: null,
	username: null,
	theme_color: null,
	profile_img: null,
	isSigninPending: false,
	isSignedIn: false,
	isSignedOut: true,
	loginError: null,
	registrationPending: false,
	registrationSuccess: false,
	registrationError: null,
	profileSettingsSuccess: false,
	profileSettingsPending: false,
	profileSettingsError: null,
	attending: [],
	hosting: []
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
				first_name: null,
				last_name: null,
				username: null,
				theme_color: null,
				profile_img: null,
				isSigninPending: true,
				isSignedIn: false,
				isSignedOut: true
			}
		case LOGIN_SUCCESS:
			return {
				...state, 
				user_id: action.payload.user_id,
				first_name: action.payload.first_name,
				last_name: action.payload.last_name,
				username: action.payload.username,
				theme_color: action.payload.theme_color,
				profile_img: action.payload.profile_img,
				isSigninPending: false,
				isSignedIn: true, 
				isSignedOut: false, 
				loginError: null
			}
		case LOGIN_ERROR:
			return {
				...state,
				user_id: null,
				first_name: null,
				last_name: null,
				username: null,
				theme_color: null,
				profile_img: null,
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
				isSigninPending: false,
				loginError: null,
				registrationError: null,
				registrationSuccess: false
			}
		case PROFILE_SETTINGS_SUCCESS:
			return {
				...state,
				...action.payload,
				profileSettingsSuccess: true,
				profileSettingsPending: false,
				profileSettingsError: null,
			}
		case PROFILE_SETTINGS_PENDING:
			return {
				...state,
				profileSettingsSuccess: false,
				profileSettingsPending: false,
				profileSettingsError: null,
			}
		case PROFILE_SETTINGS_ERROR: 
			return {
				...state,
				profileSettingsSuccess: false,
				profileSettingsPending: false,
				profileSettingsError: action.payload,
			}
		case FETCH_ATTENDING_EVENTS:
			return {
				...state,
				attending: action.payload
			}
		case FETCH_HOSTED_EVENTS:
			return {
				...state,
				hosting: action.payload
			}
		default:
			return state;
	}
}