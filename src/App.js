import React, { Component } from 'react';
import Tone from 'tone';
import TransportControls from './components/transportcontrols';
import SequencerControls from './components/sequencer-controls';
//import MixerControls from './components/mixercontrols'; This is out for now until I get a better realtime check on the controlls with Tone.js
import TrackSelection from './components/trackselection';
import './App.css';

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playstate: 0,
      bpm: 128,
      tracks: '',
      pads: 16,
      currenttrack: "track1",
      currentnotes: [],
      volume: []
    }
  }

  //Main Storage area for our notes in 16 beat time.
  sequence = {
    "track1":{
      "notes": [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
      "volume": 127,
      "sample": "./samples/909/BD.wav"
          },
    "track2":{
      "notes": [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      "volume": 127,
      "sample": "./samples/909/Snaredrum.wav"
    },
    "track3":{
      "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      "volume": 127,
      "sample": "./samples/909/Rimshot.wav"
    },
    "track4":{
      "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      "volume": 127,
      "sample": "./samples/909/Clap.wav"
    },
    "track5":{
      "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      "volume": 127,
      "sample": "./samples/909/CH.wav"
    },
    "track6":{
      "notes": [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
      "volume": 127,
      "sample": "./samples/909/OH.wav"
    },
    "track7":{
      "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      "volume": 127,
      "sample": "./samples/909/Crash.wav"
    },
    "track8":{
      "notes": [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      "volume": 127,
      "sample": "./samples/909/Ride.wav"
    }
  }

  // sampleplayer = Object(this.sequence).map((key)=> 
  //    let player[key] = new Tone.Player(this.sequence[key].sample).toMaster()
  // );
  //initialize our sequence object with a function call for a player 
  initializeSounds(ourObj){
    Object.keys(ourObj).map((track, index)=>{
      ourObj[track].fireIt= new Tone.Player({"url":ourObj[track].sample, "vol":ourObj[track].volume}).toMaster(); //Change this to sample at some point?
      return true;
    });
  }
  stopSequencer=()=>{
    this.setState({playstate: 0});
    Tone.Transport.stop();
  }

  startSequencer=()=>{
    this.setState({playstate: 1});
    Tone.Transport.start();
  }

  updateNote=(index)=>{
    let updated= + !this.state.currentnotes[index];
    let updatedMeasure = this.state.currentnotes;
    updatedMeasure[index]=updated;
    this.setState({
        currentnotes: updatedMeasure
    });
    
    // Tone.Transport.scheduleOnce((time)=>{
    //   this.sequence[this.state.currenttrack].fireIt.start()
    // },"0:0:"+index+1);
  }

  //Update our master sequencer track to selected, and save the old one
  switchTrack=(event, key)=>{
    let oldTrack = this.state.currenttrack;
    this.sequence[oldTrack].notes=this.state.currentnotes; 
    this.setState({ 
      currentnotes: this.sequence[key].notes,
      currenttrack: key
    });
    if(this.state.playstate!==1){
      this.sequence[key].fireIt.start();
    }
  }

  componentDidMount(){
    // StartAudioContext(Tone.context);
    this.initializeSounds(this.sequence);
    this.setState({
        tracks: Object.size(this.sequence),
        currentnotes: this.sequence.track1.notes
      });
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Transport.schedule(this.startLoop, "0:0:0");
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = '1m';
  }
  startLoop = (time: number) => {
    Object.keys(this.sequence).map((track)=>{
      let reducedSteps = this.sequence[track].notes.reduce(function(a, srch, i){ if(srch === 1)a.push(i+1); return a;},[]);
      // console.log(deviceson);
      reducedSteps.map((steps)=>{
          Tone.Transport.scheduleOnce((time)=>{
            this.sequence[track].fireIt.start(time);
          },"0:0:"+steps);//Ableton Timing style. eg Measures:Bars:16ths.
      });
    });
  }

  render(){
    return (
      <div className="App">
        <TransportControls
          playstate={this.state.playstate}
          bpm={this.state.bpm}
          stopSequencer = {this.stopSequencer}
          startSequencer = {this.startSequencer}
        />
        <TrackSelection
          currenttrack={this.state.currenttrack}
          sequence={this.sequence}
          switchTrack={this.switchTrack}
        />
        {/* <MixerControls
          tracks={this.state.tracks}
          sequence={this.sequence}
          /> */}
        <SequencerControls 
          pads={this.state.pads}
          currenttrack={this.state.currenttrack}
          currentnotes={this.state.currentnotes}
          sequence={this.sequence}
          updateNote={this.updateNote}
          />
      </div>
    );
  }
}

export default App;
