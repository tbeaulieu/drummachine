import React, { Component } from 'react';

class TrackSelection extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="trackselection-wrapper">
                <p>Hola, I am a placeholder for the TrackSelection.</p>
                {Object.keys(this.props.sequence).map((key)=>
                        <div key={key} className="trackselector-wrapper"><button  onClick={(event)=>this.props.switchTrack(event, key)}></button>{key}</div>
                )}
            </div>
        ) 
    }
}

export default TrackSelection;