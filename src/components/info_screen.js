import React from 'react';
import styled from 'styled-components'


const InfoScreenContainer = styled.div`
    background-color: #101010;
    border-radius: 4px;
    width: 50%;
    display: inline-block;
    text-align:left;
    padding:5px;
    p{
        line-height: 15px;
    }
    label{
        text-transform: uppercase;
        font-weight: 700;
        display: inline-block;
        margin: 0 10px 0 0;
    }
    span{
        font-family: 'Minisystem';
        display: inline-block;
        font-size: 24px;
    }
    .tempo{
        font-size: 30px;
    }
`


function InfoScreen(props){
    return(
        <InfoScreenContainer>
            <p><label>Tempo (BPM)</label>
                <span className="tempo">{props.bpm}</span></p>
                <p><label>Sample</label>
                <span>{props.currentSample}</span></p>
                <p><label>Track Length</label>
                <span>{props.masterTrackLength}</span></p>
        </InfoScreenContainer>
    )
}

export default InfoScreen;