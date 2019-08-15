import { VIEW_EVENT, VIEW_ATTENDEES, FETCH_HOST, CALC_EVENT_COORDINATES } from '../actions/types';

const INITIAL_STATE = {
    attendees: [], 
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
            console.log(action.payload)
            return {...state, coords: action.payload};
        default: 
            return state;
    }
}