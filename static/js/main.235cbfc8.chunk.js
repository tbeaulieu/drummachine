(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},16:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(8),c=a.n(r),o=(a(14),a(2)),u=a(3),i=a(5),p=a(4),l=a(6),m=a(1),h=a.n(m),f=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"transport-controls-wrapper"},s.a.createElement("p",null,"Tempo: ",s.a.createElement("input",{type:"range",defaultValue:this.props.bpm,onChange:this.props.changeTempo,min:"20",max:"300"})," ",this.props.bpm," bpm and are currently at playstate ",this.props.playstate),s.a.createElement("button",{className:"stop",onClick:this.props.stopSequencer},"stop"),s.a.createElement("button",{className:"play",onClick:this.props.startSequencer},"play"),s.a.createElement("p",null,this.props.transportTime))}}]),t}(n.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"sequencer-wrapper"},this.props.currentnotes.map(function(t,a){return s.a.createElement("div",{key:a,className:"sequencer-button-wrapper"},s.a.createElement("div",{className:1===t?"sequencer--button active":"sequencer--button",onClick:function(t){return e.props.updateNote(a)}}),s.a.createElement("label",null,a+1))}))}}]),t}(n.Component),k=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"trackselection-wrapper"},Object.keys(this.props.sequence).map(function(t){return s.a.createElement("div",{key:t,className:"trackselector-wrapper"},s.a.createElement("button",{onClick:function(a){return e.props.switchTrack(a,t)},"data-selected":e.props.currenttrack===t&&"true"},t))}))}}]),t}(n.Component);a(16);Object.size=function(e){var t,a=0;for(t in e)e.hasOwnProperty(t)&&a++;return a};var d=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(p.a)(t).call(this,e))).sequence={track1:{notes:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],volume:127,sample:"./samples/909/BD.wav"},track2:{notes:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],volume:127,sample:"./samples/909/Snaredrum.wav"},track3:{notes:[0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0],volume:127,sample:"./samples/909/Rimshot.wav"},track4:{notes:[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],volume:127,sample:"./samples/909/Clap.wav"},track5:{notes:[1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],volume:127,sample:"./samples/909/CH.wav"},track6:{notes:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],volume:127,sample:"./samples/909/OH.wav"},track7:{notes:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],volume:127,sample:"./samples/909/Crash.wav"},track8:{notes:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],volume:127,sample:"./samples/909/Ride.wav"}},a.changeTempo=function(e){a.setState({bpm:e.target.value}),h.a.Transport.bpm.value=e.target.value},a.stopSequencer=function(){a.setState({playstate:0}),h.a.Transport.stop("0"),h.a.Transport.position="0:0:0"},a.startSequencer=function(){a.setState({playstate:1}),h.a.Transport.start(),console.log(h.a.Ticks("16n"))},a.clearSequencer=function(){var e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];a.setState({currentnotes:e}),Object.keys(a.sequence).map(function(t){a.sequence[t].notes=e,console.log(a.sequence[t].notes)})},a.updateNote=function(e){console.log(e),console.log(a.state.currenttrack);var t=+!a.state.currentnotes[e],n=a.state.currentnotes;n[e]=t,a.setState({currentnotes:n}),h.a.Transport.scheduleOnce(function(e){a.sequence[a.state.currenttrack].fireIt.start()},"0:0:"+e+1)},a.switchTrack=function(e,t){var n=a.state.currenttrack;a.sequence[n].notes=a.state.currentnotes,a.setState({currentnotes:a.sequence[t].notes,currenttrack:t}),1!==a.state.playstate&&a.sequence[t].fireIt.start()},a.startLoop=function(e){Object.keys(a.sequence).map(function(e){a.sequence[e].notes.reduce(function(e,t,a){return 1===t&&e.push(a+1),e},[]).map(function(t){h.a.Transport.scheduleOnce(function(t){a.sequence[e].fireIt.start(t)},"0:0:"+t),h.a.Draw.schedule(function(t){console.log(e)},"0:0:1")})}),h.a.Transport.scheduleOnce(function(e){h.a.Draw.schedule(function(e){console.log("meow ",h.a.Time(e).toBarsBeatsSixteenths())})},"0:0:1"),h.a.Transport.scheduleOnce(function(e){h.a.Draw.schedule(function(e){console.log("woof ",h.a.Time(e).toBarsBeatsSixteenths())})},"0:0:5")},a.state={playstate:0,bpm:128,tracks:"",pads:16,currenttrack:"track1",currentnotes:[],volume:[],transportTime:""},a}return Object(l.a)(t,e),Object(u.a)(t,[{key:"initializeSounds",value:function(e){Object.keys(e).map(function(t,a){return e[t].fireIt=new h.a.Player({url:e[t].sample,vol:e[t].volume}).toMaster(),!0})}},{key:"componentDidMount",value:function(){var e=this;this.initializeSounds(this.sequence),this.setState({tracks:Object.size(this.sequence),currentnotes:this.sequence.track1.notes}),h.a.Transport.bpm.value=this.state.bpm,h.a.Transport.schedule(this.startLoop,"0:0:1"),h.a.Transport.loop=!0,h.a.Transport.loopEnd="1m",h.a.Transport.setLoopPoints("0:0:1","0:0:17"),h.a.Transport.scheduleRepeat(function(t){e.setState({transportTime:h.a.Time(t).toBarsBeatsSixteenths()})},"16n")}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(f,{changeTempo:this.changeTempo,playstate:this.state.playstate,bpm:this.state.bpm,transportTime:this.state.transportTime,stopSequencer:this.stopSequencer,startSequencer:this.startSequencer,clearSequencer:this.clearSequencer}),s.a.createElement(k,{currenttrack:this.state.currenttrack,sequence:this.sequence,switchTrack:this.switchTrack}),s.a.createElement(v,{pads:this.state.pads,currenttrack:this.state.currenttrack,currentnotes:this.state.currentnotes,sequence:this.sequence,updateNote:this.updateNote}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(18)}},[[9,2,1]]]);
//# sourceMappingURL=main.235cbfc8.chunk.js.map