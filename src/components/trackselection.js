import React, { Component } from 'react';

class TrackSelection extends Component{

    render(){
        return(
            <div className="trackselection-wrapper">
                {Object.keys(this.props.sequence).map((key)=>
                        <div key={key} className="trackselector-wrapper"><button onClick={(event)=>this.props.switchTrack(event, key)} data-selected={this.props.currenttrack === key && "true"}>{key}</button></div>
                )}
            </div>
        ) 
    }
}

export default TrackSelection;