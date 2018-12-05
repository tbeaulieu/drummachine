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
      volume: [],
      transportTime: ""
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
  changeTempo=(event)=>{
    this.setState({bpm: event.target.value});
    Tone.Transport.bpm.value = event.target.value;
  }
  stopSequencer=()=>{
    this.setState({playstate: 0});
    Tone.Transport.stop("0");
    Tone.Transport.position="0:0:0";
  }
  startSequencer=()=>{
    this.setState({playstate: 1});
    Tone.Transport.start();
    console.log(Tone.Ticks("16n"));
  }
  clearSequencer=()=>{
    const cleared=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.setState({
      currentnotes: cleared 
    });
    Object.keys(this.sequence).map((track)=>{
      this.sequence[track].notes = cleared;
      console.log(this.sequence[track].notes);
    });    
  }
  updateNote=(index)=>{
    console.log(index);
    console.log(this.state.currenttrack)
    let updated= + !this.state.currentnotes[index];
    let updatedMeasure = this.state.currentnotes;
    updatedMeasure[index]=updated;
    this.setState({
        currentnotes: updatedMeasure
    });
    
    // Need to be able to clear a note before doing this stuff
    Tone.Transport.scheduleOnce((time)=>{
      this.sequence[this.state.currenttrack].fireIt.start()
    },"0:0:"+index+1);
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
    Tone.Transport.schedule(this.startLoop, "0:0:1");
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = '1m';
    Tone.Transport.setLoopPoints("0:0:1", "0:0:17");
    Tone.Transport.scheduleRepeat((time)=>{
      this.setState({
        transportTime:Tone.Time(time).toBarsBeatsSixteenths()
      });
    },"16n");
    //Schedule the default pattern
  }
  startLoop = (time: number) => {
    // if(chaseLoop){
    //   chaseLoop.destroy();
    // }
    
    // let chaseLoop = new Tone.Loop(function(time){
    //   //instead of scheduling visuals inside of here
    //   //schedule a deferred callback with Tone.Draw
    
    //   Tone.Draw.schedule(function(){
    //     //this callback is invoked from a requestAnimationFrame
    //     //and will be invoked close to AudioContext time
    //     console.log('fart ', Tone.Time(time).toBarsBeatsSixteenths());
    //   }, time) //use AudioContext time of the event
    
    // }, "16n").start(0);

    Object.keys(this.sequence).map((track)=>{
      let reducedSteps = this.sequence[track].notes.reduce(function(a, srch, i){ if(srch === 1)a.push(i+1); return a;},[]);
      reducedSteps.map((steps)=>{
          Tone.Transport.scheduleOnce((time)=>{
            this.sequence[track].fireIt.start(time);
          },"0:0:"+steps);//Ableton Timing style. eg Measures:Bars:16ths.
          Tone.Draw.schedule((time)=>{
            console.log(track);
          },"0:0:1")
      });
    });

    Tone.Transport.scheduleOnce((time)=>{
      Tone.Draw.schedule((time)=>{
        console.log("meow ",Tone.Time(time).toBarsBeatsSixteenths());
      }); 
    }, "0:0:1");
    Tone.Transport.scheduleOnce((time)=>{
      Tone.Draw.schedule((time)=>{
        console.log("woof ",Tone.Time(time).toBarsBeatsSixteenths());
      }); 
    }, "0:0:5");
    // console.log(i);
    
  }

  render(){
    return (
      <div className="App">
        <TransportControls
          changeTempo={this.changeTempo}
          playstate={this.state.playstate}
          bpm={this.state.bpm}
          transportTime = {this.state.transportTime}
          stopSequencer = {this.stopSequencer}
          startSequencer = {this.startSequencer}
          clearSequencer = {this.clearSequencer}
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
