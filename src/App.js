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
function ClearTrack(props){
  return (
    <div className="clearcontrols">
      <button onClick={props.clearTrack}>Clear Track</button>
      {/* <button onClick={props.clearSong}>Clear All</button> */}
    </div>
  )
}

 //Main Storage area for our notes in 16 beat time.
 let sequence = {
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
    "notes": [0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0],
    "volume": 127,
    "sample": "./samples/909/Rimshot.wav"
  },
  "track4":{
    "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    "volume": 127,
    "sample": "./samples/909/Clap.wav"
  },
  "track5":{
    "notes": [1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
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
    "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "volume": 127,
    "sample": "./samples/909/Ride.wav"
  }
}

let sounds = new Tone.Players({
  "track1" : sequence.track1.sample,
  "track2" : sequence.track2.sample,
  "track3" : sequence.track3.sample,
  "track4" : sequence.track4.sample,
  "track5" : sequence.track5.sample,
  "track6" : sequence.track6.sample,
  "track7" : sequence.track7.sample,
  "track8" : sequence.track8.sample
  },{
    "volume" : -10,
    "fadeOut" : "64n"
  }).toMaster();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playstate: 0,
      bpm: 128,
      tracks: '',
      pads: 16,
      litNote: -1,
      currenttrack: "track1",
      currentnotes: [],
      volume: [],
      transportTime: ""
    }
  }
  loop = new Tone.Sequence(function(time, step){
    for(let track in sequence){
      if(sequence[track].notes[step] === 1){
        sounds.get(track).start(time)
      }
    }
    Tone.Draw.schedule(function(){
      document.querySelectorAll(".sequencer--button")[step].classList.toggle('chase');
      if(step!==0){
        document.querySelectorAll(".sequencer--button")[step-1].classList.toggle('chase');
      }
      else{
        document.querySelectorAll(".sequencer--button")[15].classList.remove('chase');
      }
    }, time);
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);

  changeTempo=(event)=>{
    this.setState({bpm: event.target.value});
    Tone.Transport.bpm.value = event.target.value;
  }
  stopSequencer=()=>{
    this.setState({playstate: 0});
    Tone.Transport.stop(0);
    Tone.Transport.position = "0:0:0";
    Tone.Transport.on("stop", () => {
      // setTimeout(() => {
      //     this.setState({
      //       litNote: -1;
      //     })
      // }, 100);
    })
    for(let i=0;i<document.querySelectorAll('.sequencer--button').length; i += 1){
      document.querySelectorAll('.sequencer--button')[i].classList.remove('chase');
    }
  }
  startSequencer=()=>{
    this.setState({playstate: 1});
    Tone.Transport.start();
  }

  updateNote=(index)=>{
    let updated = + !this.state.currentnotes[index];
    let updatedMeasure = this.state.currentnotes;
    updatedMeasure[index]=updated;
    this.setState({
        currentnotes: updatedMeasure
    });
    // Need to be able to clear a note before doing this stuff
    // console.log(sequence[this.state.currenttrack].notes);
    // Tone.Transport.scheduleOnce((time)=>{
    //   sequence[this.state.currenttrack].fireIt.start()
    // },"0:0:"+index+1);
  }
  //Update our master sequencer track to selected, and save the old one
  switchTrack=(event, key)=>{
    let oldTrack = this.state.currenttrack;
    sequence[oldTrack].notes=this.state.currentnotes; 
    this.setState((prevState)=>({ 
      currentnotes: sequence[key].notes,
      currenttrack: key
    }));
    if(this.state.playstate !== 1){
      sounds.get(key).start();
    }
  }
  clearTrack=()=>{
    const cleared = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.setState({
      currentnotes: cleared
    });
    sequence[this.state.currenttrack].notes = cleared;
  }
  clearSong=()=>{
    const cleared = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.setState({
      currentnotes: cleared
    });
    for(let track in sequence){
      sequence[track].notes = cleared;
      console.log(this.state.currenttrack)
    }
  }
  componentDidMount(){
    // StartAudioContext(Tone.context);
    // this.initializeSounds(sequence);
    this.setState({
        tracks: Object.size(sequence),
        currentnotes: sequence.track1.notes
      });
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Transport.scheduleRepeat((time)=>{
      this.setState({
        transportTime:Tone.Time(time).toBarsBeatsSixteenths()
      });
    },"16n");
    //Schedule the default pattern
  }

  render(){
    return (
      <div className="App">
        <TransportControls
          changeTempo = {this.changeTempo}
          playstate = {this.state.playstate}
          bpm = {this.state.bpm}
          transportTime = {this.state.transportTime}
          stopSequencer = {this.stopSequencer}
          startSequencer = {this.startSequencer}
          clearSequencer = {this.clearSequencer}
        />
        <TrackSelection
          currenttrack = {this.state.currenttrack}
          sequence = {sequence}
          switchTrack = {this.switchTrack}
        />
        {/* <MixerControls
          tracks={this.state.tracks}
          sequence={sequence}
          /> */}
        <ClearTrack
          clearTrack = {this.clearTrack}
          clearSong = {this.clearSong}
        ></ClearTrack>
        <SequencerControls 
          pads = {this.state.pads}
          currenttrack = {this.state.currenttrack}
          currentnotes = {this.state.currentnotes}
          litNote = {this.litNote}
          sequence = {sequence}
          updateNote = {this.updateNote}
          />
      </div>
    );
  }
}

export default App;
