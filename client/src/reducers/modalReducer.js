import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';


export default (state = {}, action) => {
    switch(action.type) {
        case OPEN_MODAL:
            return {...state, content: action.payload.content}
        case CLOSE_MODAL:
            return {...state, content: null}
        default:
            return state;
    }
}