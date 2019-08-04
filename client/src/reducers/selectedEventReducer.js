import { VIEW_EVENT } from '../actions/types';

export default (state = {}, action) => {
    switch(action.type) {
        case VIEW_EVENT:
            return {...state, ...action.payload};
        default: 
            return state;
    }
}