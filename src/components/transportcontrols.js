import React from 'react';

function TransportControls(props){
    return(
        <div className="transport-controls-wrapper">
            <p>TEMPO: <input type="range" defaultValue={props.bpm} onChange={props.changeTempo} min="20" max="300"/></p>
            <button className="stop" onClick={props.stopSequencer}>stop</button> 
            <button className="play" onClick={props.startSequencer} data-active={props.playstate === 1 ? true : false}>play</button>
            {/* <p>{props.transportTime}</p> */}
        </div>
    ) 
}

export default TransportControls;