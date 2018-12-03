import React, { Component } from 'react';

class MixerContainer extends Component{
    constructor(props){
        super(props);
    }
    handleChange(event, key){
        this.props.sequence[key].volume= event.target.value;
    }
    render(){
        return(
            <div>
                {Object.keys(this.props.sequence).map((key)=>
                <div  key={key} className="volumeslider">
                    <input id={key} defaultValue={this.props.sequence[key].volume} onChange={(event)=> this.handleChange(event, key)} type="range" min="0" max="127" step="1">
                    </input>
                </div>)}
            </div>
        ) 
    }
}

export default MixerContainer;