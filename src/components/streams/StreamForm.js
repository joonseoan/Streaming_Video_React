
import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

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

    renderInput = ({ input, label, meta }) => {

        console.log(input)
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={ className }>
                <label>{ label }</label>
                <input { ...input } autoComplete="off" />

                { this.renderErrors(meta) }

            </div>
        );
    };

    onSubmit = reduxFormEvent => {
        // console.log(reduxFormEvent);
        // this.props.createStream(reduxFormEvent);

        // since refactoring....
        // must remind this after refactoring....
        this.props.onSubmit(reduxFormEvent);
    };

    render() {

        //  ---------------------------------------------------  For editing ----------------------------------------------------
        // [ initialValues ]
        // "initialValues" is a property of reduxtForm.
        // when the redux has "this.props.initialValues"**************************8
        // it assign values to "initialValues" in reduxt.
        // It must be a form of the plain object
        //  absolutely with the key name identical with Field name down below.!!!!!!!!!!!!!!!!!!!
        // Then, the "component" function assigns each field to each input!!!!!!!!
        // console.log(this.props)
        return (
            <form onSubmit={ this.props.handleSubmit(this.onSubmit) } className="ui form error">

                <Field name = "title" 
                       label = "Enter Title" 
                       component = { this.renderInput } 
                      
                />
                <Field name = "description" 
                       label = "Enter Description"
                       component = { this.renderInput } 
                />
                <button className="ui button primary" type="submit">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if(!formValues.title) {
        errors.title = 'You must enter a title.';
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description.'
    }
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
