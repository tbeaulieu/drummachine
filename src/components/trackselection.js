import React, { Component } from 'react';

class TrackSelection extends Component{

    render(){
        return(
            <div className="trackselection-wrapper">
                {Object.keys(this.props.sequence).map((key, index)=>
                        <div key={key} className="trackselector-wrapper">
                            <button className="mute" onClick={(event)=>this.props.muteTrack(event, index, key)} data-muted={this.props.muted[index]}>MUTE</button>
                            <button onClick={(event)=>this.props.switchTrack(event, key)} data-selected={this.props.currenttrack === key && "true"}>{key}</button>
                        </div>
                )}
            </div>
        ) 
    }
}

export default TrackSelection;