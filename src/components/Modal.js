// Example of Portal / Modal
import React from 'react';
import ReactDOM from 'react-dom';

// to programmatically redirec the page
// import history from '../history';

// REFACTORING BY USING PROPS OF Portal TO BE REUSEFUL.

const Modal = props => {
    console.log('props in Modal', props)
    // two arguments almost same as "ReactDOM.render()"
    return ReactDOM.createPortal(
        <div
            // className="modal" => all the browser screen!!
            // to make the modal disapprear when we click the window. 
            onClick={() => { 
               // back to "/"
               // history.push('/');
               
               // to just dismiss
               props.onDismiss();
            }} 
            className="ui dimmer modals visible active">
            <div
                // ************************************8
                // Normally, in javascript and html,
                //  the parent dom inherits the event function to the children
                // So when we set up onClick event above,
                //  the event function covers the all children's event functions
                // For instance, when we click the button, it bubbles up to the "history.push('/') above"
                // In order to prevent this behavior, we need to setup "e.stopPropagation()"
                onClick={ (e) => { e.stopPropagation(); }} 
                className="ui standard modal visible active">

                <div className="header">{ props.title }</div>
                
                <div className="content">
                    { props.content }
                </div>
                <div className="actions">
                    { props.actions }
                </div>
            </div>
        </div>,

        // need a id=modal in document object of index.html
        document.querySelector('#modal')
    );
};

export default Modal;

