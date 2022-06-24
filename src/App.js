import React, {useState, useEffect} from 'react';
import Init from './Engine/Init';
import './App.css';
import EditorCode from './Editor/editorCode';
import useLocalStorage from './Editor/localStorage';

var mounted = false;
var init='';
export default function App(){
  const [code, setCode] = useLocalStorage('js','');

  useEffect(()=>{
    if(!mounted){
      mounted = true;
      init = new Init({id:"game"});
      codeChange(code);
      
      document.querySelector("#run").onclick= function() {codeChange(code)};
    }
  })

  const start = () =>{
    init.run();
    codeChange(code);
  }

  const codeChange = (e) =>{
    setCode(e);
    init.codeChange(e);
  }
  
  return(
    <div>
      <div className="container">
        <canvas id="game" width="400" height="300" style={{border: '1px solid black'}}></canvas>
        
        <span id="fps"></span>
        <button id="run" onClick={start}>Run</button>
        <button id="addObject" width="100" height="50">Add</button>
        <select name="gameObjects" id="gameObjects" multiple size="1">
          <optgroup id="listGameObjects" label="GameObjects: ">
            <option value="gameObject1"></option>
          </optgroup>
        </select>

        <div className="editor">
          <div className='pane top-pane'>
            <EditorCode displayName="Javascript" value={code} onChange={(e) => {codeChange(e)}} />
          </div>
        </div>

      </div>
    </div>

  );
}
