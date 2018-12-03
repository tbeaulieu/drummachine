import React, { Component } from 'react';

class SequencerControls extends Component{
    render(){
        return(
            <div className="sequencer-wrapper">
                {this.props.currentnotes.map((box, index) => 
                    <div key={index} className="sequencer-button-wrapper">
                        <div className={box===1 ? "sequencer--button active" : "sequencer--button"} onClick={(event)=>this.props.updateNote(index)}></div>
                        <label>{index+1}</label>
                    </div>)}
            </div>
        ) 
    }
}

export default SequencerControls;