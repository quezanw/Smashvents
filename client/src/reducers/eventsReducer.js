import { 
  FETCH_ALL_EVENTS,
  EVENT_ERROR, 
  CREATE_EVENT,
  EDIT_EVENT
} from '../actions/types';

const INITIAL_STATE = {
  events: [],
  eventError: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_ALL_EVENTS:
      return {
        ...state,
        events: action.payload
      }
    case EVENT_ERROR:
      return {
        ...state,
        eventError: action.payload
      }
    case CREATE_EVENT: 
      return {
        ...state,
        eventError: null
      }
    case EDIT_EVENT: 
      return {
        ...state,
        eventError: null
      }
    default:
      return state;
  }
}