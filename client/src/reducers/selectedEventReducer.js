

export default (state = {}, action) => {
    switch(action.type) {
        case 'VIEW_EVENT':
            return {...state, event: action.payload};
        default: 
            return state;
    }
}