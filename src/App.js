import React from 'react';
import Init from './Engine/Init';
import addObject from './Engine/Init';
import './App.css';
import GameObject from './Engine/objectsComponets/gameObject';

var init, gameObjects;
export default class App extends React.Component{
  componentDidMount(){
    gameObjects = new GameObject({path: require("./Engine/Resources/Player.png"), posX: 10, posY: 10, imageW: 4, imageH: 4});
    gameObjects.CHIAMAMI(); //QUESTO FUNZIONA
    
    init = Init("game");
    console.log(init); //<-- UNDEFINED ... CERTO
    addObject(1,1,0.5,"./Engine/Resources/Player.png") //QUESTO NO PORCA PUTTANA
  }
  
  render(){
    return(
      <div>
        <div class="container">
          <canvas id="game" width="800" height="600" style={{border: '1px solid black'}}></canvas>
          <span id="fps"></span>
          <button id="addObject" width="100" height="50" onClick={console.log()/*init.addObject(1,1,0.5,"../Resources/testimage.png")*/}>Add</button>
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
