import React from 'react';

let cachedScripts = [];
let loadingScripts = [];
class UseScript extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loaded: false,
      error: false
    };
    
    this.useEffect(props.path);
  }

  useEffect = (src) => {
    if (cachedScripts.includes(src)) {
      this.state.loaded = true;
      this.state.error = false;
    }
    else{
      let script;

      if(loadingScripts[src]){
        script = loadingScripts[src];
      }else{
        script = document.createElement('script');
        script.src = src;
        script.async = true;

        loadingScripts[src] = script;

        document.body.appendChild(script);
      }

      const onScriptLoad = () => {
        cachedScripts[src] = script;
        
        delete loadingScripts[src];

        this.state.loaded = true;
        this.state.error = false;
      };

      const onScriptError = () => {
        // Remove it from cache, so that it can be re-attempted if someone tries to load it again
        delete cachedScripts[src];
        script.remove();

        this.state.loaded = true;
        this.state.error = true;
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      document.body.appendChild(script);
    }
  }
}

export default UseScript;