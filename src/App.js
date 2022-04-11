import React, {useState, useEffect} from 'react';
import Init from './Engine/Init';
import './App.css';
import EditorCode from './Editor/editorCode';
import useLocalStorage from './Editor/localStorage';

var mounted = false;
var prova='';
export default function App(){
  const [code, setCode] = useLocalStorage('js','');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(()=>{
    if(!mounted){
      mounted = true;
      prova = Init("game", setCode);
    }
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body></body>
          <script>${code}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout);

  }, [code]);

  const codeChange = (e) =>{
    console.log(prova);
  }

  const codeChange2 = (e) =>{
    setCode(e); codeChange(e)
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
            <option value="gameObject1">gameObject1</option>
            <option value="gameObject2">gameObject2</option>
          </optgroup>
        </select>

        <div className="editor">
          <div className='pane top-pane'>
            <EditorCode displayName="Javascript" value={code} onChange={(e) => {codeChange2(e)}} />
          </div>
          <div className='pane'>
            <iframe srcDoc={srcDoc} title='output' sandbox='allow-scripts' frameBorder="0" width="100%" height="100%"/>
          </div>
        </div>

      </div>
    </div>

  );
}
