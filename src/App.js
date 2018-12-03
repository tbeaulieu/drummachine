import React, { Component } from 'react';
import Tone from 'tone';
import TransportControls from './components/transportcontrols';
import SequencerControls from './components/sequencer-controls';
import MixerControls from './components/mixercontrols';
import TrackSelection from './components/trackselection';
import './App.css';

Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};



Tone.Transport.loop = true;
Tone.Transport.loopEnd = '1m';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playstate: 0,
      bpm: 100,
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
      "sample": "./samples/909/Snaredrum.wav"
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

  
  stopSequencer=()=>{
    this.setState({playstate: 0});
    Tone.Transport.stop();
  }

  startSequencer=()=>{
    this.setState({playstate: 1});
    Tone.Transport.start();
    Tone.context.resume().then(()=> {player.autostart = true});
  }

  updateNote=(index)=>{
    let updated= + !this.state.currentnotes[index];
    let updatedMeasure = this.state.currentnotes;
    updatedMeasure[index]=updated;
    this.setState({
        currentnotes: updatedMeasure
    });
  }

  switchTrack=(event, key)=>{
    let oldTrack = this.state.currenttrack;
    this.sequence[oldTrack].notes=this.state.currentnotes; //Update our master sequence
    console.log(this.sequence[key].notes);
    this.setState({ 
      currentnotes: this.sequence[key].notes,
      currenttrack: key
    });
  }

  componentDidMount(){
    // StartAudioContext(Tone.context);
    let player = new Tone.Player(this.sequence.track1.sample).toMaster();

    this.setState({
        tracks: Object.size(this.sequence),
        currentnotes: this.sequence.track1.notes
      })
  }

  render() {
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
        <MixerControls
          tracks={this.state.tracks}
          sequence={this.sequence}
          />
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
