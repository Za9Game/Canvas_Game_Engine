import React from 'react';

let cachedScripts = {};
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
    const onScriptLoad = () => {
      cachedScripts[src].loaded = true;
      
      this.state.loaded = true;
      this.state.error = false;
      console.log("PROVAAA "+this.state.loaded + " er: "+ this.state.error);
    };

    const onScriptError = () => {
      // Remove it from cache, so that it can be re-attempted if someone tries to load it again
      delete cachedScripts[src];

      this.state.loaded = true;
      this.state.error = true;
      console.log("PROVAAA "+this.state.loaded + " er: "+ this.state.error);
    };

    let scriptLoader = cachedScripts[src];
    if(scriptLoader) { // Loading was attempted earlier
      console.log(cachedScripts);
      if(scriptLoader.loaded) { // Script was successfully loaded
        this.state.loaded = true;
        this.state.error = false;
        console.log("PROVAAA "+this.state.loaded + " er: "+ this.state.error);
      } else { //Script is still loading
        let script = scriptLoader.script;
        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    } 
    else {
      // Create script
      console.log("ENTRO QUA CAZZO");
      let script = document.createElement('script');
      script.src = src;
      script.async = true;

      // Script event listener callbacks for load and error


      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      // Add script to document body
      document.body.appendChild(script);

      cachedScripts[src] = {loaded:false, script};

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }
  }
}

export default UseScript;