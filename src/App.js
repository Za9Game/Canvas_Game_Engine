import React from 'react';
import Init from './Engine/Init';
import './App.css';

export default class App extends React.Component{
  componentDidMount(){
    Init("game");
  }
  
  render(){
    return(
      <div>
        <div className="container">
          <canvas id="game" width="800" height="600" style={{border: '1px solid black'}}></canvas>
          <span id="fps"></span>
          <button id="addObject" width="100" height="50" onClick={console.log("")}>Add</button>
        </div>
      </div>
    ); 
  }
}
