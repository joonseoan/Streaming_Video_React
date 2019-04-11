/* 
    [It is an important rule!!!]***************8

    WILDCARD COMPONENT SHOULD BE ISOLATED!!!!!!!!!!!!!!!!!11

    When we use a wild card,
    The component might have to have its own action creator.
    So when the user directly accesses to the wildcard url,
    the redux store data must be available.

    Just remember as long as App.js has action creator,
    ans when the user directly accesses to wild card,
    it does not have any reduxt state value. 
    It is because when the app is loaded up, the state value is null!!! ***********

*/

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {  fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount = () => {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
    }

    onSubmit = e => {
        //editStream()
        console.log(e)
        const { id } = this.props.match.params;
        this.props.editStream(id, e);
    }

    render() {

        if(!this.props.stream) {
            return <div>Loading...</div>;
        }
        
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    // [initialValues]
                    // "initialValues" is a built-in name in reduxForm
                    //  The name must be "initialValues"
                    //  for each value to be assigned to right each input
                    // Value must be a plain object form with the same name as the target inputs have.

                    // [ Rule of PUT method ]
                    // When we update the values while are editing,
                    //  do not send the fixed value like id and userId.

                    // It does not generate errors but
                    //  it will affect the performance and
                    //  it can be hacked.
                    // It is an industrial standard.
                    // We have four ways to filter out.
                    // 1) { ...props, a : undefined } for object
                    // 2) use lodash _.omit() for object???
                    // 3) use { a, noA } for object
                    // 4) use lodash pick for object as shown below. title and description are keys of the object.
                    initialValues={ _.pick(this.props.stream, 'title', 'description') }
                    onSubmit={ this.onSubmit }
                />
            </div>
        );
    }
}

const mapStateToProps = ({ streams }, ownProps) => {

    // "streams[id]" must be here wherever it is from '/'  which yeles { {}, {}, {}... } 
    //  or direct of this url which yields {{}}
    // minimize data in react component!@@@@@@@@@@@@@@@@@@@@@@@@
    const { id } = ownProps.match.params;
    // "streams" is an object. do not use find!!!!!!!! 
    return {
        stream: streams[id]
    }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);

// since refactoring.....
// import React from 'react';
// import { connect } from 'react-redux';

// import {  fetchStream } from '../../actions'

// class StreamEdit extends React.Component {
//     componentDidMount = () => {
//         const { id } = this.props.match.params;
//         this.props.fetchStream(id);
//     }

//     render() {
        
//         return <div>StreamEdit</div>
//     }
// }

// const mapStateToProps = ({ streams }, ownProps) => {

//     // "streams[id]" must be here wherever it is from '/'  which yeles { {}, {}, {}... } 
//     //  or direct of this url which yields {{}}
//     // minimize data in react component!@@@@@@@@@@@@@@@@@@@@@@@@
//     const { id } = ownProps.match.params;
//     // "streams" is an object. do not use find!!!!!!!! 
//     return {
//         stream: streams[id]
//     }
// }

// export default connect(mapStateToProps, { fetchStream })(StreamEdit);