import React, { Component } from 'react';

class TransportControls extends Component{
    
    render(){
        return(
            <div className="transport-controls-wrapper">
            <p>INTERACTIVE DEMO</p>
            <div classId="title-label">Start by clicking on any of these buttons!</div>
            <br />
                <p>Tempo: {this.props.bpm} bpm<input type="range" defaultValue={this.props.bpm} onChange={this.props.changeTempo} min="20" max="300"/> </p>
                <button className="stop" onClick={this.props.stopSequencer}>stop</button> 
                <button className="play" onClick={this.props.startSequencer} data-active={this.props.playstate===1 ? true : false}>play</button>
                <p>{this.props.transportTime}</p>
                {/* <button className="clear" onClick={this.props.clearSequencer}>clear</button> */}
                {/* {this.props.bpm>180 && <h1 className="spinner">REAL HARDCORE MANNNNNN!!!</h1>} */}
            </div>
        ) 
    }
}

export default TransportControls;