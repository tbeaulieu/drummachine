import React, { Component } from 'react';

class TransportControls extends Component{
    
    render(){
        return(
            <div className="transport-controls-wrapper">
                <p>We are playing at {this.props.bpm} bpm and are currently at playstate {this.props.playstate}</p>
                <button className="stop" onClick={this.props.stopSequencer}>stop</button> 
                <button className="play" onClick={this.props.startSequencer}>play</button>
            </div>
        ) 
    }
}

export default TransportControls;