import React, { Component } from 'react';
import Tone from 'tone';
import InfoScreen from './components/info_screen';
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
    "sample": "./samples/909/BD.wav",
    "trkLength": 16,
    "muted": 0
  },
  "track2":{
    "notes": [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
    "volume": 127,
    "sample": "./samples/909/Snaredrum.wav",
    "trkLength": 16,
    "muted": 0
  },
  "track3":{
    "notes": [0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0],
    "volume": 127,
    "sample": "./samples/909/Rimshot.wav",
    "trkLength": 16,
    "muted": 0
  },
  "track4":{
    "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    "volume": 127,
    "sample": "./samples/909/Clap.wav",
    "trkLength": 16,
    "muted": 0
  },
  "track5":{
    "notes": [1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
    "volume": 127,
    "sample": "./samples/909/CH.wav",
    "trkLength": 16,
    "muted": 0
  },
  "track6":{
    "notes": [0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],
    "volume": 127,
    "sample": "./samples/909/OH.wav",
    "trkLength": 16,
    "muted": 0
  },
  "track7":{
    "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "volume": 127,
    "sample": "./samples/909/Crash.wav",
    "trkLength": 16,
    "muted": 0
  },
  "track8":{
    "notes": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "volume": 127,
    "sample": "./samples/909/Ride.wav",
    "trkLength": 16,
    "muted": 0
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

let createTrackArray = function(trkLength){
  let lengthArray=[]
  for(let i=0; i<trkLength; i++){
    lengthArray.push(i);
  }
  return lengthArray;
}

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
      muted: [false,false,false,false,false,false,false,false],
      transportTime: ""
    }
  }

  //LOOP SECTION 

  loop1 = new Tone.Sequence(function(time, step){
      if(sequence.track1.notes[step] > 0 && !sequence.track1.muted){
        sounds.get("track1").start(time)
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
  }, createTrackArray(sequence.track1.trkLength), "16n").start(0);  //array controls pattern length

  loop2 = new Tone.Sequence(function(time, step){
      if(sequence.track2.notes[step] > 0 && !sequence.track2.muted){
        sounds.get("track2").start(time)
      }
  }, createTrackArray(sequence.track2.trkLength), "16n").start(0);

  loop3 = new Tone.Sequence(function(time, step){
    if(sequence.track3.notes[step] > 0 && !sequence.track3.muted){
      sounds.get("track3").start(time)
    }
  }, createTrackArray(sequence.track3.trkLength), "16n").start(0);
 
  loop4 = new Tone.Sequence(function(time, step){
    if(sequence.track4.notes[step] > 0 && !sequence.track4.muted){
      sounds.get("track4").start(time)
    }
  }, createTrackArray(sequence.track4.trkLength), "16n").start(0);
 
  loop5 = new Tone.Sequence(function(time, step){
    if(sequence.track5.notes[step] > 0 && !sequence.track5.muted){
      sounds.get("track5").start(time)
    }
  }, createTrackArray(sequence.track5.trkLength), "16n").start(0);

  loop6 = new Tone.Sequence(function(time, step){
    if(sequence.track6.notes[step] > 0 && !sequence.track6.muted){
      sounds.get("track6").start(time)
    }
  }, createTrackArray(sequence.track6.trkLength), "16n").start(0);

  loop7 = new Tone.Sequence(function(time, step){
    if(sequence.track7.notes[step] > 0 && !sequence.track7.muted){
      sounds.get("track7").start(time)
    }
  }, createTrackArray(sequence.track7.trkLength), "16n").start(0);

  loop8 = new Tone.Sequence(function(time, step){
    if(sequence.track8.notes[step] > 0 && !sequence.track8.muted){
      sounds.get("track8").start(time)
    }
  }, createTrackArray(sequence.track8.trkLength), "16n").start(0);

  //END LOOP SECTION


  changeTempo=(event)=>{
    this.setState({bpm: event.target.value});
    Tone.Transport.bpm.value = event.target.value;
  }
  stopSequencer=()=>{
    this.setState({playstate: 0});
    Tone.Transport.stop(0);
    Tone.Transport.position = "0:0:0";
    // Tone.Transport.on("stop", () => {
    //   // setTimeout(() => {
    //   //     this.setState({
    //   //       litNote: -1;
    //   //     })
    //   // }, 100);
    // })
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
  muteTrack=(event, index, key)=>{
    console.log(index);
    let muteArray = this.state.muted;
    muteArray[index] = !this.state.muted[index];
    this.setState((prevState)=>({
      muted: muteArray
    }));
    sequence[key].muted = !sequence[key].muted;
    console.log(sequence[key].muted);
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
  }

  render(){
    return (
      <div className="App">
        <InfoScreen
          bpm = {this.state.bpm}
          currentSample = {sequence[this.state.currenttrack].sample.split('./samples')[1]}
          tracklength = {sequence[this.state.currenttrack].trkLength}
        ></InfoScreen>
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
          muteTrack = {this.muteTrack}
          muted = {this.state.muted}
        />
        {/* <MixerControls
          tracks={this.state.tracks}
          sequence={sequence}
          /> */}
        <ClearTrack
          clearTrack = {this.clearTrack}
          clearSong = {this.clearSong}
        ></ClearTrack>
        <div className="notebars">
          <div className="notebar"></div>
          <div className="notebar"></div>
          <div className="notebar"></div>
          <div className="notebar"></div>
        </div>
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
