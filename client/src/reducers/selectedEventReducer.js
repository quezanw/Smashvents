import { 
    VIEW_EVENT, 
    VIEW_ATTENDEES, 
    TOTAL_ATTENDEES,
    FETCH_HOST, 
    CALC_EVENT_COORDINATES,
    FETCH_ATTENDEE_PAGE
} from '../actions/types';

const INITIAL_STATE = {
    attendees: [],
    totalAttendees: null, 
    page: [],
    host: null,
    coords: null
}
export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case VIEW_EVENT:
            return {...INITIAL_STATE, ...action.payload};
        case VIEW_ATTENDEES:
            return {...state, attendees: action.payload};
        case FETCH_HOST:
            return {...state, host: action.payload};
        case CALC_EVENT_COORDINATES:
            return {...state, coords: action.payload};
        case TOTAL_ATTENDEES:
            return {...state, totalAttendees: action.payload};
        case FETCH_ATTENDEE_PAGE: 
            return {...state, page: action.payload};
        default: 
            return state;
    }
}