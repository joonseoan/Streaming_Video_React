import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '../../history';
import { deleteStream, fetchStream } from '../../actions';


class StreamDelete extends React.Component {
    
    
    componentDidMount = () => {
        // console.log(this.props.match.params.id);
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => {
        return(
            <React.Fragment>
                <button
                    onClick={ () => this.props.deleteStream(this.props.match.params.id) }
                    className="ui button negative"
                >
                    DELETE
                </button>
                <Link 
                    to="/"
                    className="ui button"
                >
                    CANCEL
                </Link>
            </React.Fragment>
        );
    }

    renderContent = () => {
        if(!this.props.stream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
    }

    render() {
        return <Modal 
            title="Delete Stream"
            content={ this.renderContent() }
            actions={ this.renderActions() }
            onDismiss={ () => history.push('/') }
        />;
        
    }
}

const mapStateToProps = ({ streams }, ownProps) => {
    return { stream: streams[ ownProps.match.params.id ] };
}

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);