import { FETCH_ALL_EVENTS } from '../actions/types';


export default (events = [], action) => {
  switch(action.type) {
    case FETCH_ALL_EVENTS:
      return action.payload
    default:
      return events;
  }
}