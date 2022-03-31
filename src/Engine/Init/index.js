import hitDetection from "../Physics/mainPhysics";
import GameObject from "../objectsComponets/gameObject";

let gameStarted; 

let balloonX;
let balloonY;

let verticalVelocity;
let horizontalVelocity; 

let fuel; 
let heating; 

let trees; 
let backgroundTrees; 

let horizontalPadding;
let verticalPadding;

const hill1BaseHeight = 80;
const hill1Speed = 0.2;
const hill1Amplitude = 10;
const hill1Stretch = 1;
const hill2BaseHeight = 50;
const hill2Speed = 0.2;
const hill2Amplitude = 15;
const hill2Stretch = 0.5;
const hill3BaseHeight = 15;
const hill3Speed = 1;
const hill3Amplitude = 10;
const hill3Stretch = 0.2;

let mainAreaWidth;
let mainAreaHeight;

let ctx;
let gameObjects;

function resetGame() {
  gameStarted = false;
  heating = false;
  verticalVelocity = 5;
  horizontalVelocity = 5;
  balloonX = 0;
  balloonY = 0;
  fuel = 100;

  //introductionElement.style.opacity = 1;
  //restartButton.style.display = "none";

  trees = [];
  for (let i = 1; i < canvas.width / 50; i++) generateTree();

  backgroundTrees = [];
  for (let i = 1; i < canvas.width / 30; i++) generateBackgroundTree();

  draw();
}
  
function generateBackgroundTree() {
  const minimumGap = 30;
  const maximumGap = 150;

  const lastTree = backgroundTrees[backgroundTrees.length - 1];
  let furthestX = lastTree ? lastTree.x : 0;

  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));

  const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
  const color = treeColors[Math.floor(Math.random() * 3)];

  backgroundTrees.push({ x, color });
}

function generateTree() {
  const minimumGap = 50;
  const maximumGap = 600;

  const x = trees.length
    ? trees[trees.length - 1].x +
      minimumGap +
      Math.floor(Math.random() * (maximumGap - minimumGap))
    : 400;

  const h = 60 + Math.random() * 80;

  const r1 = 32 + Math.random() * 16;
  const r2 = 32 + Math.random() * 16;
  const r3 = 32 + Math.random() * 16;
  const r4 = 32 + Math.random() * 16;
  const r5 = 32 + Math.random() * 16;
  const r6 = 32 + Math.random() * 16;
  const r7 = 32 + Math.random() * 16;

  const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
  const color = treeColors[Math.floor(Math.random() * 3)];

  trees.push({ x, h, r1, r2, r3, r4, r5, r6, r7, color });
}


const velocityChangeWhileHeating = 0.4;
const velocityChangeWhileCooling = 0.2;

function animate() {



  if (trees[0].x - (balloonX - horizontalPadding) < -100) {
    trees.shift();
    generateTree();
  }

  if (
    backgroundTrees[0].x - (balloonX * hill1Speed - horizontalPadding) <
    -40
  ) {
    backgroundTrees.shift();
    generateBackgroundTree();
  }

}

function physics(){
  if (heating && fuel > 0) {
    if (verticalVelocity > -8) {
      verticalVelocity -= velocityChangeWhileHeating;
    }
    fuel -= 0.002 * -balloonY;
  } else if (verticalVelocity < 5) {
    verticalVelocity += velocityChangeWhileCooling;
  }


  balloonY += verticalVelocity;
  if (balloonY > 0) balloonY = 0;
  if (balloonY < 0) balloonX += horizontalVelocity;

  /*
  const hit = hitDetection(balloonX, balloonY, trees);
  if (hit || (fuel <= 0 && balloonY >= 0)) {
    resetGame();
    return;
  }*/
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //drawSky(); // Fill the background with a gradient

  ctx.save();
  ctx.translate(0, verticalPadding + mainAreaHeight);
  //drawBackgroundHills();

  ctx.translate(horizontalPadding, 0);

  // Center main canvas area to the middle of the screen
  ctx.translate(-balloonX, 0);


  gameObjects.forEach(object =>{
    object.draw(ctx, canvas);
  });


  // Draw scene
  //drawTrees();
  //drawBalloon();

  // Restore transformation
  ctx.restore();

  // Header is last because it's on top of everything else
  //drawHeader();
}

function drawCircle(cx, cy, radius) {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawTrees() {
  trees.forEach(({ x, h, r1, r2, r3, r4, r5, r6, r7, color }) => {
    ctx.save();
    ctx.translate(x, 0);

    // Trunk
    const trunkWidth = 40;
    ctx.fillStyle = "#885F37";
    ctx.beginPath();
    ctx.moveTo(-trunkWidth / 2, 0);
    ctx.quadraticCurveTo(-trunkWidth / 4, -h / 2, -trunkWidth / 2, -h);
    ctx.lineTo(trunkWidth / 2, -h);
    ctx.quadraticCurveTo(trunkWidth / 4, -h / 2, trunkWidth / 2, 0);
    ctx.closePath();
    ctx.fill();

    // Crown
    ctx.fillStyle = color;
    drawCircle(-20, -h - 15, r1);
    drawCircle(-30, -h - 25, r2);
    drawCircle(-20, -h - 35, r3);
    drawCircle(0, -h - 45, r4);
    drawCircle(20, -h - 35, r5);
    drawCircle(30, -h - 25, r6);
    drawCircle(20, -h - 15, r7);

    ctx.restore();
  });
}

function drawBalloon() {
  ctx.save();

  ctx.translate(balloonX, balloonY);

  ctx.drawImage("../Resources/testimage.png", 10, 30);

  ctx.restore();
}

function drawHeader() {
  // Fuel meter
  ctx.strokeStyle = fuel <= 30 ? "red" : "white";
  ctx.strokeRect(30, 30, 150, 30);
  ctx.fillStyle = fuel <= 30 
    ? "rgba(255,0,0,0.5)" 
    : "rgba(150,150,200,0.5)";
  ctx.fillRect(30, 30, (150 * fuel) / 100, 30);

  // Score
  const score = Math.floor(balloonX / 30);
  ctx.fillStyle = "black";
  ctx.font = "bold 32px Tahoma";
  ctx.textAlign = "end";
  ctx.textBaseline = "top";
  ctx.fillText(`${score} m`, canvas.width - 30, 30);
}

function drawSky() {
  var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#AADBEA");
  gradient.addColorStop(1, "#FEF1E1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBackgroundHills() {
  // Draw hills
  drawHill(
    hill1BaseHeight,
    hill1Speed,
    hill1Amplitude,
    hill1Stretch,
    "#AAD155" // #95C629"
  );
  drawHill(
    hill2BaseHeight,
    hill2Speed,
    hill2Amplitude,
    hill2Stretch,
    "#84B249" // "#659F1C"
  );

  drawHill(
    hill3BaseHeight,
    hill3Speed,
    hill3Amplitude,
    hill3Stretch,
    "#26532B"
  );

  // Draw background trees
  backgroundTrees.forEach((tree) => drawBackgroundTree(tree.x, tree.color));
}

// A hill is a shape under a stretched out sinus wave
function drawHill(baseHeight, speedMultiplier, amplitude, stretch, color) {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
  for (let i = 0; i <= canvas.width; i++) {
    ctx.lineTo(i, getHillY(i, baseHeight, speedMultiplier, amplitude, stretch));
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawBackgroundTree(x, color) {
  ctx.save();
  ctx.translate(
    (-balloonX * hill1Speed + x) * hill1Stretch,
    getTreeY(x, hill1BaseHeight, hill1Amplitude)
  );

  const treeTrunkHeight = 5;
  const treeTrunkWidth = 2;
  const treeCrownHeight = 25;
  const treeCrownWidth = 10;

  // Draw trunk
  ctx.fillStyle = "#7D833C";
  ctx.fillRect(
    -treeTrunkWidth / 2,
    -treeTrunkHeight,
    treeTrunkWidth,
    treeTrunkHeight
  );

  // Draw crown
  ctx.beginPath();
  ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
  ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
  ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.restore();
}

function getHillY(x, baseHeight, speedMultiplier, amplitude, stretch) {
  const sineBaseY = -baseHeight;
  return (
    Math.sinus((balloonX * speedMultiplier + x) * stretch) * amplitude +
    sineBaseY
  );
}
  
function getTreeY(x, baseHeight, amplitude) {
  const sineBaseY = -baseHeight;
  return Math.sinus(x) * amplitude + sineBaseY;
}
  

  


let canvas;
function Init(id){
  canvas = document.getElementById(id);
  ctx = canvas.getContext("2d");

  mainAreaWidth = canvas.width-130;
  mainAreaHeight = canvas.height-130;

  horizontalPadding = (canvas.width - mainAreaWidth) / 2;
  verticalPadding = (canvas.height - mainAreaHeight) / 2;

  gameObjects = [new GameObject({path: require("../Resources/Player.png"), posX: -10, posY: -10, imageW: 64, imageH: 64})];

  /*
  introductionElement = document.getElementById("introduction");
  restartButton = document.getElementById("restart");    
  restartButton.addEventListener("click", function (event) {
      event.preventDefault();
      resetGame();
      restartButton.style.display = "none";
  });
*/
  resetGame();

  window.addEventListener("mousedown", function () {
    heating = true;
  
    if (!gameStarted) {
      //introductionElement.style.opacity = 0;
      gameStarted = true;
    }
  });
    
  window.addEventListener("mouseup", function () {
    heating = false;
  });
    
  window.addEventListener("resize", function () {
    horizontalPadding = (canvas.width - mainAreaWidth) / 2;
    verticalPadding = (canvas.height - mainAreaHeight) / 2;
    draw();
  });

  const fpsElem = document.querySelector("#fps");
  let then = 0;
  const update = (now) =>{
    if(gameStarted){
      physics();
      animate();
      draw();

      fpsCalc(now);
    }

    window.requestAnimationFrame(update);
  }
  window.requestAnimationFrame(update);

  const fpsCalc = (now) =>{
    now *= 0.001;                          
    const deltaTime = now - then;          
    then = now;                            
    const fps = 1 / deltaTime;             
    fpsElem.textContent = fps.toFixed(1); 
  }

}

export default Init;