import React from 'react';
import styled from 'styled-components';

const TrackSelectionWrapper = styled.div`
    width: 700px;
    display:inline-block;
    margin: 30px 0;
`
const TrackWrapper = styled.div`
    width:80px;
    display:inline-block;
    padding:5px;
    input[type=range]{
        height: 100px;
        width: 70px;
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
        margin: 0 auto 10px;
        text-align: center;
    }
    button{
        width: 70px;
        height: 30px;
        line-height: 25px;
        font-size: 10px;
        font-weight: 700;
        appearance: none;
        padding:none;
        text-transform: uppercase;
        border: 2px solid #e0d7d7;
        color: #e0d7d7;
        background-color:#606c88;
        -webkit-appearance: none;
        border-radius:2.5px;
        cursor: pointer;
        margin: 0 0 5px;
        &[data-selected=true]{
            background-color: #e0d7d7;
            color: #606c88;
            transition: background-color .1s, color .1s;
        }
        &[data-muted=true]{
            background-color: #101010;
            color: #8f8b8b;
            border-color: #8f8b8b;
        }
      }
`

const TrackLengthInput = styled.input`
    border: none;
    appearance: none;
    background-color: #3f4c6b;
    color: #fff;
    &::after{
        content: 'TRK LNGTH';
        color: #fff;
        position: relative;
    }
`

function TrackSelection(props){
        return(
            <TrackSelectionWrapper>
                {Object.keys(props.sequence).map((key, index)=>
                        <TrackWrapper key={key}>
                            {/* <input type="range" orient="vertical" min="-80" max="6" defaultValue={this.props.sequence[key].volume} onChange={(event)=> this.props.changeVolume(event, key)}></input> */}
                            <button className="mute" onClick={(event)=>props.muteTrack(event, index, key)} data-muted={props.muted[index]}>MUTE</button>
                            <button onClick={(event)=>props.switchTrack(event, key)} data-selected={props.currenttrack === key && "true"}>{key}</button>
                            {/* <TrackLengthInput type="number" min="1" max="64" placeholder={this.props.sequence[key].trackLength}></TrackLengthInput> */}
                        </TrackWrapper>
                )}
            </TrackSelectionWrapper>
        )
}

export default TrackSelection;