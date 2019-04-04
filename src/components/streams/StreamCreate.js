
import React from 'react';
import { connect } from 'react-redux';
// Field : Be react component fro reduxForm class Field. It is why it uses capital "F"
//  "component" down below is a helper function that receives a callbck 

// reduxtForm: function that is exactly same role as "connect()"" of react-redux
import { Field, reduxForm } from 'redux-form';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {

    renderErrors = ({ error, touched }) => {

        if(error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">
                        { error }
                    </div>
                </div>
            );
        } else {
            return;
        }

    }

    // Eventually this helper function is a callback that will be invoked in "component" functions below.
    // <Field component={} />

    // field (any name): is a map parameter containing all input event functions.
    //      that are working inside of redux-form lib.
    
    // 1)
    // renderInput = (field) => {

    /* 
        -  "field": brings up 1) the required event functions such as onChange,
                meta data setup functions, and dispatch in reduxForm as shown below.

        - It is an object that contains all the functions 
            which is invoked and run in redux-form and then dispatched to reach reducer

        input: {name: "title", onBlur: ƒ, onChange: ƒ, onDragStart: ƒ, onDrop: ƒ, …}
        meta: {active: false, asyncValidating: false, autofilled: false, dirty: false, dispatch: ƒ, …}
        __proto__: Object
    
    */
    // console.log(field)

    // Based on a group of event functions of "field"
    // "input" must implement "field"'s event function defined in "field.input", 
    //    not use the React component level event function, to get to the redux store.

    // 2) destructuring
    renderInput = ({ input, label, meta }) => {

        // control input color in terms of error.
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;


        // meta : to pass down "error message" defined in the validation function
        //   and functions built-in to manage the error in front end.
        // console.log('meta: ', meta)

        // 3) destructuring
        return (
            <div className={ className }>
                <label>{ label }</label>
                {/* 
                    { ...inpupt }: automatically select appropriate function. 
                    autoComplete: autocoplete off ************
                */}
                <input { ...input } autoComplete="off" />
                {/* 1) 
                    <div>{ meta.touched ? meta.error : '' }</div>
                */}
                {/*  2) by using functions */}
                { this.renderErrors(meta) }
            </div>
        );
        
        // 2) Copy all input field value including....
        // return <input { ...field.input } />;

        // 1)
        // return <input onChange={ field.input.onChange } value = { field.input.value } />;
    };

    // 2) By implementing "this.props.handleSubmit" built in reduxForm
    //  we should set it up differently from the componen level submit management.
    //  "reduxFormEvent" (any name): that is from "this.props.hanleSubmit"'s event parameter so called "e" or "event".
    //  to easily readable and understandable
    //  we will use "reduxFormEvent" instead of "event"
    onSubmit = reduxFormEvent => {

        // reduxFormEvent: delivers input "name" and "value"
        //  instead of e.target.value and e.target.name
        /* 
            {
                description: "value"
                title: "name"
            } 
        */
        console.log(reduxFormEvent);
        this.props.createStream(reduxFormEvent);

    };

    // 1)
    // component level onSubmit helper event function.
    // onSubmit = e => {
    //     e.preventDefault();
    // }

    render() {
        console.log(this.props); // find fx : handleSubmit()
        return (
            // onSubmit: props field name in React
            // "this.props.handleSubmit": from reduxForm
            // "this.onSubmit": helper function up and above.
            // In result, reduxForm's "this.props.handleSubmit" takes "this.onSubmit" in as a callback parameter
            //  that is invoked in reduxForm!!!!!

            // !!!!!1 [Semantic UI] : to show error message, we must put "error" in className.
            //  because the default value is "hide!!!"
            <form onSubmit={ this.props.handleSubmit(this.onSubmit) } className="ui form error">
                {/* Field: all input types composed in Class */}
                {/* 
                    **** reduxForm will automatically manage the event functions
                        by utilizing the event function parameters defined in reduxForm

                    **** component: just helper function, in Field Class,
                            that receives and renders the return 
                                    inside of Field class

                        It mainly works with a callbck like the below.
                */}

                {/* 
                
                    [ IMPORTANT!!!! ]
                    whenever we put attributes like like name and label to Field calss 
                    those attributes can be used in a "component" function.

                    In other words, the component fuction can implement those attributes
                    as we did in class object.

                    class Field {
                        construnctor() {
                            this.aa =aa;
                            this.bb = bb;
                        }

                        component(callback) {
                            const dd = this.aa
                            const ff = this.bb

                            callback(this.aa, this.bb)
                        }
                    }

                    Therefore, "label" attribute/props can be set as a paramter in 
                    "this.renderInput"
                
                */}

                <Field name = "title" 
                       component = { this.renderInput } 
                       label = "Enter Title" 
                />
                <Field name = "description" 
                       component = { this.renderInput } 
                       label = "Enter Description"
                />
                <button className="ui button primary" type="submit">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    // check out "formValues.title" field
    if(!formValues.title) {
        // then, add error message to "title" created in errors object
        //  not brought up from "formValues.title"
        // [Important] field name must be identical with the name of "<Field>"
        // For instance, title === title of Field below
        /* 
            <Field name = "title" 
                component = { this.renderInput } 
                label = "Enter Title" 
            />
        */
        // It is bacause reduxForm always takes a look at the errors.title's field name
        //  then if the errors object is not empty, it will find error's field name like title
        //  then will pass down that field name as a paramter "included in "meta""" of the component function 
        //  which has the Field name, "title", for instance. 
        errors.title = 'You must enter a title.';
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description.'
    }

    return errors;

}

// 2) with redux and reduxForm
const formWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);

// 1) reduxForm only
// export default reduxForm({ 
//     // form: built-in key name of reduxForm
//     // It stores a form with a name "stramCreate 
//     //  and then" sends funtional value to React component
//     //  over/through props.
//     form: 'streamCreate',

//     // wire up validate function to reduxForm
//     validate
// })(StreamCreate);