import React, { Component } from 'react';

class TransportControls extends Component{
    
    render(){
        return(
            <div className="transport-controls-wrapper">
                <p>Tempo: <input type="range" defaultValue={this.props.bpm} onChange={this.props.changeTempo} min="20" max="300"/> <span>{this.props.bpm} bpm</span></p>
                <button className="stop" onClick={this.props.stopSequencer}>stop</button> 
                <button className="play" onClick={this.props.startSequencer} data-active={this.props.playstate === 1 ? true : false}>play</button>
                {/* <p>{this.props.transportTime}</p> */}
                {/* <button className="clear" onClick={this.props.clearSequencer}>clear</button> */}
                {/* {this.props.bpm>180 && <h1 className="spinner">REAL HARDCORE MANNNNNN!!!</h1>} */}
            </div>
        ) 
    }
}

export default TransportControls;