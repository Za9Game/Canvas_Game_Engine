import React from "react";
import hitDetection from "../Physics/mainPhysics";
import GameObject from "../objectsComponets/gameObject";

let gameStarted; 

let ctx;
let gameObjects = [];

function resetGame() {
  gameStarted = false;
  
  draw();
}

function inputDown(e){
  gameObjects.forEach(object =>{
    try{
      object.keyDown(e);
    }catch{
    }
  });
}
function inputUp(e){

}

function physics(){
  /*
  const hit = hitDetection(balloonX, balloonY, trees);
  if (hit || (fuel <= 0 && balloonY >= 0)) {
    resetGame();
    return;
  }*/
}

function animate(){
  
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.restore();

  ctx.webkitImageSmoothingEnabled = false;

  ctx.mozImageSmoothingEnabled = false;

  ctx.imageSmoothingEnabled = false;

  gameObjects.forEach(object =>{
    object.draw(ctx, canvas);
  });
}

const updateList = () =>{
  //rimmuove tutti gli elementi della lista
  while (gameObjectsList.firstChild) {
    gameObjectsList.removeChild(gameObjectsList.lastChild);
  }

  //la ripopola con tutti i gameobjects
  gameObjects.forEach(object =>{
    try{
      var opt = document.createElement('option');
      console.log(object.state.name);
      opt.value = object.state.name;
      opt.innerHTML = object.state.name;
      gameObjectsList.appendChild(opt);
    }
    catch{}
  });
}

var gameObjectsList;
let canvas;

const Init = (id) =>{
  canvas = document.getElementById(id);
  ctx = canvas.getContext("2d");

  const initialzieButtons = () =>{
    document.querySelector("#addObject").onclick= function() {if(gameStarted)addObject(3,2,4,4, require("../Resources/Player.png"))};
    document.querySelector("#run").onclick= function() {gameStarted = true; updateList();};
    gameObjectsList = document.querySelector("#listGameObjects");
  }
  
  const addObject = (x, y, scaleX, scaleY, path) =>{
    try{
      gameObjects.push(new GameObject({path: require(path), posX: x, posY: y, imageW: scaleX, imageH: scaleY, name: "GameObject "+gameObjects.length}));
    }catch{
      gameObjects.push(new GameObject({path: path, posX: x, posY: y, imageW: scaleX, imageH: scaleY, name: "GameObject "+gameObjects.length}));  
    }
    updateList();
  }
  resetGame();

  gameObjects = [new GameObject({path: require("../Resources/Player.png"), posX: 10, posY: 10, imageW: 4, imageH: 4, name: "GameObject "+gameObjects.length})];
  
  
  initialzieButtons();
  

  window.addEventListener("mousedown", function () {
    
  //  if (!gameStarted) {
      //introductionElement.style.opacity = 0;
  //    gameStarted = true;
  //  }
  });
    
  window.addEventListener("mouseup", function () {
    
  });
    
  window.addEventListener("resize", function () {
    draw();
  });
  
  window.addEventListener('keydown',inputDown,false);
  window.addEventListener('keyup',inputUp,false);


  
  var fps = 60, fpsInterval, then, elapsed;
  fpsInterval = 1000 / fps;
  then = Date.now();

  const fpsElem = document.querySelector("#fps");
  let before = 0;

  const update = (now) =>{
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      if(gameStarted){

        physics();
        animate();
        draw();

        console.log("GameObjects: "+gameObjects.length)

        fpsCalc(now);
      }
    }
    
    window.requestAnimationFrame(update);
  }
  window.requestAnimationFrame(update);

  const fpsCalc = (now) =>{
    now *= 0.001;                          
    const deltaTime = now - before;          
    before = now;                            
    const fps = 1 / deltaTime;             
    fpsElem.textContent = fps.toFixed(1); 
  }

}

export default Init;