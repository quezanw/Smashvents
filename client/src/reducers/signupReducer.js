
export default (state = {}, action) => {
  switch(action.type) {
    case 'CREATE_USER':
     return {...state, [action.payload._id]: action.payload};
    default:
      return state;
  }
}