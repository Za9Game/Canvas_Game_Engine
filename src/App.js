import React, {useState, useEffect} from 'react';
import Init from './Engine/Init';
import './App.css';
import EditorCode from './Editor/editorCode';
import useLocalStorage from './Editor/localStorage';

var mounted = false;
var init='';
export default function App(){
  const [code, setCode] = useLocalStorage('js','');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(()=>{
    if(!mounted){
      mounted = true;
      init = new Init({id:"game"});
    }
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body></body>
          <script>${code}</script>
        </html>
      `)
    }, 1000)

    return () => clearTimeout(timeout);

  }, [code]);

  const codeChange = (e) =>{
    setCode(e);
    init.codeChange(e);
  }

  return(
    <div>
      <div className="container">
        <canvas id="game" width="800" height="600" style={{border: '1px solid black'}}></canvas>
        
        <span id="fps"></span>
        <button id="run">Run</button>
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
          <div className='pane'>
            <iframe srcDoc={srcDoc} title='output' sandbox='allow-scripts' frameBorder="0" width="100%" height="100%"/>
          </div>
        </div>

      </div>
    </div>

  );
}
