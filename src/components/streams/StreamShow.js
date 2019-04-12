import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import{ fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }
    
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);

        // When we put this.videoRef.current over here,
        //  we reload the Streams/Show
        // we will get null  because of
        /* 
              if(!this.props.stream) {
                    return <div>Loading...</div>;
                }
        
        */
        // which has us not go to "return" where 
        //  ref={ this.videoRef } is located.
        // Therefore we will have an error about this.play.attachMediaEelement()
        // console.log(this.videoRef.current) // null
       
        
        // connection to video
        // this.player = flv.createPlayer({
        //     type: 'flv',
        //     url: `http://localhost:8000/live/${ this.props.match.params.id }.flv`
        // });

        // this.player.attachMediaElement(this.videoRef.current);
        // this.player.load();
        
        // in case that stream is availalbe when the user clicks on title of StreamList
        //  because 'sreams' redux is available from mapStateToProps.

        // BTW, when reload the STREAM SHOW page again, steams will be thrown away
        //  then state value will be null ****************************8
        //  which means again that we can access to return of render function.
        //  that causes this.videoRef.current is null!!!!!!!!!**********88
        this.buildPlayer();
    }

    buildPlayer() {

        if(this.player || !this.props.stream) {
            return;
        }
        
        // connection to video
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${ this.props.match.params.id }.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }

        const { title, description } = this.props.stream;
        return(<div>
            {/* 
                1) video element
                2) using ref 
                3) setup : style {}
                4) controls: JSX attributes
                    in order to pass down props to video element
            */}
            <video 
                ref={ this.videoRef } 
                style={{ width: '100%'}}
                controls={ true }
            />
            <h1>{ title }</h1>
            <h5>{ description }</h5>
        </div>);
    };

    // when the page is reload,
    // the component will update state, stream value..... through componentDidMount
    // then access to return of render()
    // Then componentDidUpdate will be invocked on the basis of lifecycle rule
    //  this function will call builPlayer again()
    
    // not necessary to set parameters because in this case
    //  the variable is this.props.stream!
    // BRW, this.props.match.params.id is fixed in this component.
    componentDidUpdate() {
        this.buildPlayer();
    }

    // It automaticallyworks the borwser leaves this component
    // It should normally be used without props which means that
    //  the data in this compoentn is associated with other component.
    // *************************************8
    componentWillUnmount() {
        console.log('unmount?');

        // clean up the video is displaying
        this.player.destroy();
    }
}

const mapStateToProps = ({ streams }, ownProps) => {
    return {
        stream: streams[ ownProps.match.params.id ]
    };
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);