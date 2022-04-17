import React from "react";
import hitDetection from "../Physics/mainPhysics";
import GameObject from "../objectsComponets/gameObject";
import $ from 'jquery';
import { render } from "@testing-library/react";

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
  let selectedIndex = 0;
  if(gameObjectsList.selectedIndex != -1){
    selectedIndex = gameObjectsList.selectedIndex;
  }

  while (gameObjectsList.firstChild) {
    gameObjectsList.removeChild(gameObjectsList.lastChild);
  }

  var optG = document.createElement('optgroup');
  optG.label = "GameObjects:";
  gameObjectsList.appendChild(optG);

  //la ripopola con tutti i gameobjects
  gameObjects.forEach(object =>{
    try{
      var opt = document.createElement('option');
      console.log(object.state.name);
      opt.value = object.state.name;
      opt.innerHTML = object.state.name;
      optG.appendChild(opt);
    }
    catch{}
  });
  gameObjectsList.selectedIndex = selectedIndex;
}

const addObject = (x, y, scaleX, scaleY, path) =>{
  try{
    gameObjects.push(new GameObject({path: require(path), posX: x, posY: y, imageW: scaleX, imageH: scaleY, name: "GameObject "+gameObjects.length}));
  }catch{
    gameObjects.push(new GameObject({path: path, posX: x, posY: y, imageW: scaleX, imageH: scaleY, name: "GameObject "+gameObjects.length}));  
  }
  updateList();
}

const codeChange = (e) =>{
  if(gameObjectsList.selectedIndex == -1)
    return;
  
  var gameObjectToChange;
  var listObjectName = gameObjectsList.options[gameObjectsList.selectedIndex].value;

  gameObjects.forEach(object =>{
    //console.log(object.state.name + "  " + listObjectName);
    if(object.state.name == listObjectName){
      gameObjectToChange = object;
      return true;
    }
  });
  if(gameObjectToChange != undefined){
    if($('head script[src="'+listObjectName+'.js"]').length <= 0){
      var script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", listObjectName+'.js');

      document.getElementsByTagName('head')[0].appendChild(script);
      console.log("prima volta ");
      console.log(script.src);
    }
    $.getScript(listObjectName+".js")
        .done(function(script, textStatus){
          script = script.replace(script, e);
          eval(script);
          console.log( "Load was performed ");
          console.log( "name script: " + listObjectName+'.js');
        })
        .fail(function(){
          console.log("LOADING FAILED");
        });
    $.getScript(listObjectName+".js")
        .done(function(script, textStatus){
          console.log(script);
        })
        .fail(function(){
          console.log("LOADING FAILED");
        });
    console.log(gameObjectToChange);
  }
}

var gameObjectsList;
let canvas;
  
var fps = 60, fpsInterval, then, elapsed;

var fpsElem;
let before = 0;

class Init extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      id : props.id
    };

    this.initialize();
  }

  initialize = () => {
    canvas = document.getElementById(this.state.id);
    ctx = canvas.getContext("2d");
    fpsElem = document.querySelector("#fps");

    fpsInterval = 1000 / fps;
    then = Date.now();
    
    resetGame();

    gameObjects = [new GameObject({path: require("../Resources/Player.png"), posX: 10, posY: 10, imageW: 4, imageH: 4, name: "GameObject "+gameObjects.length})];
    
    
    this.initialzieButtons();

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

    
    window.requestAnimationFrame(this.update);
  }



  initialzieButtons = () =>{
    document.querySelector("#addObject").onclick= function() {if(gameStarted)addObject(3,2,4,4, require("../Resources/Player.png"))};
    document.querySelector("#run").onclick= function() {gameStarted = true; updateList();};
    gameObjectsList = document.querySelector("#gameObjects");

    document.querySelector("#editorCode")
  }



  update = (now) =>{
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      if(gameStarted){
        try{
          //console.log(gameObjectsList.options[gameObjectsList.selectedIndex].value);
        }
        catch{
         // console.log(gameObjectsList.options);
        }
        physics();
        animate();
        draw();

        console.log("GameObjects: "+gameObjects.length)

        this.fpsCalc(now);
      }
    }
    
    window.requestAnimationFrame(this.update);
  }

  fpsCalc = (now) =>{
    now *= 0.001;                          
    const deltaTime = now - before;          
    before = now;                            
    const fps = 1 / deltaTime;             
    fpsElem.textContent = fps.toFixed(1); 
  }

  codeChange = (e) =>{
    if(gameStarted)
      codeChange(e);
  }
}

export default Init;