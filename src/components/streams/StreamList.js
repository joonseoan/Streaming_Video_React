import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

// const StreamList = () => {
//     console.log(fetchStreams());
//     return <div>StreamList</div>
// }

// We need the class based component because of asynch funcion of action creator.
class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin = stream => {
        // [userId]
        // the way to assign authority to a specific user
        //  who has currently logged in.

        console.log(stream)
        if(stream.userId === this.props.currentUserId) {
            return (<div className="right floated content">
                {/* <button className="ui button primary">EDIT</button> */}
                
                {/* using wild card */}
                <Link 
                    to={`/streams/edit/${ stream.id }`}
                    className="ui button primary"    
                >
                    EDIT
                </Link>
                <Link
                    to={`/streams/delete/${ stream.id }`} 
                    className="ui button negative"
                >
                    DELETE
                </Link>
            </div>);
        }
    }

    renderList = () => {
        return this.props.streams.map(stream => {
            return (<div className="item" key={ stream.id }>
                { this.renderAdmin(stream) }
                <i className="large middle aligned icon camera" />
                <div className="content">
                    { stream.title }
                    <div className="description">
                        { stream.description }
                    </div>
                </div>
            </div>);
        });
    }

    renderCreate = () => {
        // [isSignedIn]
        // the way to assign authority to all signed-in user
        if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link className="ui button primary" to="/streams/new">CREATE STREAM</Link>
                </div>
            );
        }
    }

    render() {
        return (<div>
            <h2>Streams</h2>
            <div className="ui celled list">
                { this.renderList() }
            </div>   
            { this.renderCreate() } 
        </div>);
    }
}


// streams: typeof Object
const mapStateToProps = ({ streams, auth }) => {
    // transforming Object to Array
    //  Object.values(object)!!!

    // Also, we can use lodash as well!
    return { 
        streams: Object.values(streams),
        currentUserId: auth.userId,
        isSignedIn: auth.isSignedIn
    };
}

//export default StreamList;
export default connect(mapStateToProps, { fetchStreams })(StreamList);

// export default StreamList;