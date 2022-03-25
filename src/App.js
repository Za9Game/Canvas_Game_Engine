import React from 'react';
import Init from '../src/Engine/Init';
import './App.css';

var init;
export default class App extends React.Component{
  componentDidMount(){
    init = Init("game");
  }
  
  render(){
    return(
      <div>
        <div class="container">
          <canvas id="game"></canvas>
          <div id="introduction">
            <p>Hold down the mouse to raise</p>
            <p>Fly low to save fuel</p>
          </div>
          <button id="restart">RESTART</button>
        </div>

        <a id="youtube" target="_blank" href="https://youtu.be/Ymbv6m3EuNw">
          <span>Learn HTML Canvas while building a game</span>
        </a>
        <div id="youtube-card">
          Learn HTML Canvas while building this game
        </div>
        
        { /*  

        <div>
          <canvas id="webgl" width="600" height="400" style={{border: '1px solid black'}}></canvas>
          <span id="fps"></span>
          <button id="addObject" width="100" height="50" /*onClick={init.addObject(1,1,0.5,"../Resources/testimage.png")}>Add</button>
        </div>
        
        */}
      </div>
    ); 
  }
}
