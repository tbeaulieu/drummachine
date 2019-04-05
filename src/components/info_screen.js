import React, { Component } from 'react';

class InfoScreen extends Component{

    render(){
        return(
            <div className="infoScreen">
                <p><label>Tempo (BPM)</label>
                    <span className="tempo">{this.props.bpm}</span></p>
                    <p><label>Sample</label>
                    <span>{this.props.currentSample}</span></p>
                    <p><label>Track Length</label>
                    <span>{this.props.tracklength}</span></p>
            </div>
        )
    }
}

export default InfoScreen;