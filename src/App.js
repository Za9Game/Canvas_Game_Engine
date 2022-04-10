import React, {useState, useEffect} from 'react';
import Init from './Engine/Init';
import './App.css';
import EditorCode from './Editor/editorCode';
import useLocalStorage from './Editor/localStorage';

var mounted = false;
export default function App(){
  const [code, setCode] = useLocalStorage('js','');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(()=>{
    if(!mounted){
      mounted = true;
      Init("game");
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


  return(
    <div>
      <div className="container">
        <canvas id="game" width="800" height="600" style={{border: '1px solid black'}}></canvas>
        <span id="fps"></span>
        <button id="run">Run</button>
        <button id="addObject" width="100" height="50">Add</button>
        <div className="editor">
          <div className='pane top-pane'>
            <EditorCode displayName="Javascript" value={code} onChange={setCode} />
          </div>
          <div className='pane'>
            <iframe srcDoc={srcDoc} title='output' sandbox='allow-scripts' frameBorder="0" width="100%" height="100%"/>
          </div>
        </div>

      </div>
    </div>

  );
}
