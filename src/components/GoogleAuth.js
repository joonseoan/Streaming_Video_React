/* 

    As we loaded <script src="https://apis.google.com/js/api.js"></script>
    we can use google lib, so called "gapi". (Please, type "gapi" in browser console.)

    BTW, gapi can be used not only for Oauth but also for any other services of google.
    
    In the console.
    1) type gapi. => only "load" function is available.
    2) type gapi.load('client:auth2'); 
        Then, type "gapi" again => => many oauth2 functions are available.
        ---------------------------------------------
        {load: ƒ, loaded_0: null, _: {…}, config: {…}, auth2: {…}, …}
        auth: {authorize: ƒ, checkSessionState: ƒ, getAuthHeaderValueForFirstParty: ƒ, getToken: ƒ, getVersionInfo: ƒ, …}
        auth2: {init: ƒ, authorize: ƒ, _gt: ƒ, enableDebugLogs: ƒ, getAuthInstance: ƒ, …}
        client: {init: ƒ, load: ƒ, newBatch: ƒ, newRpcBatch: ƒ, newHttpBatch: ƒ, …}
        config: {get: ƒ, update: ƒ}
        load: ƒ (a,b)
        loaded_0: null
        platform: {go: ƒ}
        widget: {make: ƒ}
        _: {b: ƒ, _DumpException: ƒ, aa: Array(31), PK: ƒ, jb: ƒ, …}
        __proto__: Object
        ----------------------------------------------

    3) type gapi.client.init({clientId: 'for instance, clientId'}) 

*/

/* 

    in the browser console,
    1) type "gapi.auth2.getAuthInstance()" ===> "auth" object
    2) find: 
        BT: ƒ ()
        Fda: ƒ ()
        Q1: ƒ ()
        T8: ƒ ()
        W2: ƒ ()
        Xo: {xx: ƒ, W2: ƒ, Q1: ƒ, BT: ƒ, g7: ƒ, …}
        attachClickHandler: ƒ ()
        currentUser: xF {Ab: WE, Aia: vF, hg: sF}
        disconnect: ƒ ()
        g7: ƒ ()
        getInitialScopes: ƒ ()
        grantOfflineAccess: ƒ ()
        isSignedIn: xF {Ab: false, Aia: vF, hg: sF}
        j8: jF {jA: {…}, aea: "single_host_origin", Ofa: true, d2: true, Z1: undefined, …}
        signIn: ƒ ()
        signOut: ƒ ()
        xx: ƒ ()
        __proto__: Object

*/


import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

import { GOOGLE_OAUTH_CLIENT_ID } from '../keys';

class GoogleAuth extends React.Component {

    auth;


    // 1) component level state
    // state = {
    //     // false: not signed in
    //     // true: signed in
    //     // null: we do not know.
    //     isSignedIn: null 
    // };

    // invoke google oauth functions from google.
    componentDidMount() {
        // window must be here.
        // callback for the success invoking the function libs from google.
        window.gapi.load('client:auth2', () => {
            // based on "Promise"
            window.gapi.client.init({ 
                clientId: GOOGLE_OAUTH_CLIENT_ID,
                // scope ia differnt parts that we want to access to out of "user accounts"
                // for instance, user "profile" and "email" 
                scope: 'email'
            })
            .then(() => {

                // visit the doc site : https://developers.google.com/api-client-library/javascript/reference/referencedocs
                // get "gapi.auth2.getAuthInstance()" ===> "auth" object!!!
                
                // "this: " is a react class attributes.
                /* 
                    GoogleAuth {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
                    auth: Ay {j8: jF, Xo: {…}, xx: ƒ, W2: ƒ, Q1: ƒ, …} ==> everything here about gapi's functional objects!!!!!!************8
                    context: {}
                    props: {}
                    refs: {}
                    state: {isSignedIn: false}
                    updater: {isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ}
                    _reactInternalFiber: FiberNode {tag: 1, key: null, elementType: ƒ, type: ƒ, stateNode: GoogleAuth, …}
                    _reactInternalInstance: {_processChildContext: ƒ}
                    isMounted: (...)
                    replaceState: (...)
                    __proto__: Component
                */
                // console.log('this: ', this)

                // so we can implement auth object as the react's component level variable/attribute.  ****************************88
                this.auth = window.gapi.auth2.getAuthInstance();

                // 1) component level state
                // we can use the ones below since we define this.auth above
                /* 
                    this.auth.signIn() => generating pop-up window for signin
                    this.auth.signOut() => results in sginout
                
                */
                // this.auth.isSignedIn.get() : just to get "current" signin status with boolean value
                //  when it is rendering at the second time.
                // Again, this is working only at the the second rendering
                //  because it is inside (componentDidUpdate)
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });

                // listen() : listen to change of signIn and signOut
                // Whenever the auth status changes,
                //  it invokes "callback"
                //  that eventually updates state!!!
                // this.auth.isSignedIn.listen(this.onAuthChange);

                // 2) by using rudux store
                // console.log('didMount:  ', this.auth.isSignedIn.get());
                this.onAuthChange(this.auth.isSignedIn.get());

                // For the change in future.
                this.auth.isSignedIn.listen(() => { 
                        this.onAuthChange(this.auth.isSignedIn.get()); 
                    }
                );
            });
        });
    }

    // by using redux store
    // to change ui only in terms of "this.auth.isSignedIn.get()"
    onAuthChange = (isSignedIn) => {

        /* 
            [getId()]
            gapi.auth2.getAuthInstance().currentUser.get().getId();
            ==> "106344982928402053034"
        */
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    // callback of listen(): It updates the state whenever auth status changes
    // 1) by using internal component state
    // onAuthChange = () => {
    //     this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    // }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        // 2) using redux store
        if(this.props.isSignedIn === null) {
        // 1) using component level state
        // if(this.state.isSignedIn === null) {
            // return <div>I do not know if we are signed in</div>;
            return null;
        // using reduxt store
        } else if(this.props.isSignedIn) {
        // using component level state
        //  } else if(this.state.isSignedIn) {
            return (
                <button className="ui red google button"
                    onClick = { this.onSignOutClick }
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui blue google button"
                    onClick = { this.onSignInClick }
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {

        /* 
            By using __proto__ of gapi.auth2.getAuthInstance().isSignedIn
            
            1) __proto__ : prototype property of legacy objects in Javascript
            2) listen(callback) in prototype

            // wheneever we use callback in listen(), it will retrieve "isSignedIn"
            xF {... 
                {hg: Array(0)}__proto__: Ei: ƒ (a)get: ƒ ()listen: ƒ (a)set: ƒ (a)constructor: ƒ (a)__proto__: Object}
        
        */
        return(<div>{ this.renderAuthButton() }</div>);
    }
}

const mapStateToProps =  ({ auth }) => {
    return auth;
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

// export default GoogleAuth;