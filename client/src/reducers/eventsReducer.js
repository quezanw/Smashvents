


export default (event = [], action) => {
  switch(action.type) {
    case 'FETCH_ALL_EVENTS':
      return action.payload
    default:
      return event;
  }
}