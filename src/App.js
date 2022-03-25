import React from 'react';
import Init from '../src/WebGl/Init';
import './App.css';

var init;
export default class App extends React.Component{
  componentDidMount(){
    init = Init('webgl');
  }

  render(){
    return(
      <div>
        <canvas id="webgl" width="600" height="400" style={{border: '1px solid black'}}></canvas>
        <span id="fps"></span>
        <button id="addObject" width="100" height="50" /*onClick={init.addObject(1,1,0.5,"../Resources/testimage.png")}*/>Add</button>
      </div>
    ); 
  }
}
