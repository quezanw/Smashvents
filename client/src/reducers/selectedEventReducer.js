import { VIEW_EVENT, VIEW_ATTENDEES, FETCH_HOST } from '../actions/types';

export default (state = { attendees: [], host: null }, action) => {
    switch(action.type) {
        case VIEW_EVENT:
            return {...state, ...action.payload};
        case VIEW_ATTENDEES:
            return {...state, attendees: action.payload};
        case FETCH_HOST:
            return {...state, host: action.payload};
        default: 
            return state;
    }
}