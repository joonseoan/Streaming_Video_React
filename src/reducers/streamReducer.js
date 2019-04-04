import _ from 'lodash';
import { 
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
 } from '../actions/types';

 export default (state = {}, action) => {
     switch(action.type) {
         case FETCH_STREAMS:
            // changing the array into "id" based object
            // The second "..." a head of _.mapKeys is to copy the entire object elements
            //  to the "...state"************
            return { ...state, ..._.mapKeys(action.payload, 'id') };
         case FETCH_STREAM:
            // created an object 
            // - key name : id number
            // - value : stream data including "id"
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            // Same syntax when new data is overriding on the same key name.
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            // _.omit(entire object, a key name required to remove)
            // action.payload : id
            return _.omit(state, action.payload)
         default:
            return state;
     }
 }