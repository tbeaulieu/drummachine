import React from 'react';
import styled from 'styled-components';

const SequencerWrapper = styled.div`
    margin: 0 0 0;
    border-radius: 8px;
    display:inline-block;
    padding: 0 0px;
`
const SequencerButtonWrapper = styled.div`
    display:inline-block;
    margin: 0 0 10px;
    width: 50px;
    label{
        position: relative;
        display: block;
        text-align: center;
        margin: 5px 5px 0;
        font-size: 11px;
        color: #aaa4a4;
        font-weight:800;
        font-family: Helvetica, sans-serif;
    }
    :nth-of-type(4n+1) .sequencer--button::after{
        content:'';
        width: 20px;
        height: 5px;
        border-radius: 1.5px;
        display:block;
        position: absolute;
        bottom: 10px;
        left: 10px;
        background-color: #000;
      }
`

function SequencerControls(props){
        return(
            <SequencerWrapper>
                {props.currentnotes.map((box, index) => 
                    <SequencerButtonWrapper key={index}>
                        <div className={box === 1 ? "sequencer--button active" : "sequencer--button"} onClick={(event)=> props.updateNote(index)}></div>
                        <label>{index+1}</label>
                    </SequencerButtonWrapper>)}
            </SequencerWrapper>
        ) 
}

export default SequencerControls;