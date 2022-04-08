import React from 'react';
import Init from './Engine/Init';
import './App.css';
import UseScript from './Editor/useScript';

const useProva = () =>{
  
}

export default class App extends React.Component{
  componentDidMount(){
    Init("game");
  }
  
  constructor(props){
    super(props);
    
    new UseScript("./Editor/editorCode.js");
  }

  render(){
    return(
      <div>
        <div className="container">
          <canvas id="game" width="800" height="600" style={{border: '1px solid black'}}></canvas>
          <span id="fps"></span>
          <button id="addObject" width="100" height="50">Add</button>
          <button id="run">Run</button>
          <div class="editor">
            <div class="code">
              <div class="js-code"></div>
            </div>
          </div>
          <div class="preview">
            <iframe id="preview-window"></iframe>
          </div>

        </div>
      </div>

    ); 
  }
}
