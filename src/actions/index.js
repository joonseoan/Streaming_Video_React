import history from '../history';

import { SIGN_IN, 
        SIGN_OUT, 
        CREATE_STREAM, 
        FETCH_STREAMS, 
        FETCH_STREAM, 
        DELETE_STREAM, 
        EDIT_STREAM } from './types';

import streams from '../apis/streams';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
}


/* 
    way to get history methods in action creator
    1) A component which has "history" method passes it down to action creator
        as a parameter. (However, it is not ideal solution.)
    
    2) The best way is to create a file and make it have BrowserRouter which has "history" method
    and then Whenever the components or action creators need to make use of it,
    , they can import the history method.
*/


// Do not forget "getSate()"!!!! from the redux-store.
export const createStream = formValues => async (dispatch, getState) => {
    // ****************************************
    const { userId } = getState().auth;
    // adding userId
    const response = await streams.post('/streams',  
        
        // We can directly use copy in arguments
        // the way to merge the new properties
        { ...formValues, 
            userId: userId || ''
        }
    );

    dispatch({ type: CREATE_STREAM, payload: response.data });

    // since we import history 
    //  we can put redirect in action creator.
    history.push('/');

}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
    
}

export const fetchStream = id => async dispatch => {
    const response = await streams.get('/streams/' + id);

    dispatch({ type: FETCH_STREAM, payload: response.data });
    
}

export const editStream = (id, formValues) => async dispatch => {

    // When we update parts of the document
    const response = await streams.patch('/streams/' + id, formValues);
    
    // [PUT VS PATCH] *******************************************
    // When we update parts of the document, we should not use "PUT"
    //  Because when "PUT" gets request, it makes the document empty,
    //      then receives the new object.
    // Therefore, when two fields out for five fields are sent to "PUT",
    //  the rest three fields are not available anymore in the document. 
    // const response = await streams.put('/streams/' + id, formValues);
    
    dispatch({ type: EDIT_STREAM, payload: response.data });

    history.push('/');
    
}

// no response from delete !!!
export const deleteStream = id => async dispatch => {
    await streams.delete('/streams/' + id);

    dispatch({ type: DELETE_STREAM, payload: id });

    history.push('/');
    
}