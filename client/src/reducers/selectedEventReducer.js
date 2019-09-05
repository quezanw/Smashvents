import { 
    VIEW_EVENT, 
    VIEW_ATTENDEES, 
    TOTAL_ATTENDEES,
    FETCH_HOST, 
    CALC_EVENT_COORDINATES
} from '../actions/types';

const INITIAL_STATE = {
    attendees: [],
    totalAttendees: null, 
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
        default: 
            return state;
    }
}