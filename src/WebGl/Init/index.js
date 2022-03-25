import Light from '../LightSource';
import Camera from "../Camera";
import MouseEvent from "../EventHandlers/mouse";
import GameObject from "../objectsComponents/gameObject";

function Init(id){
    const canvas = document.querySelector(`#${id}`);
    
    if(!canvas){
        return;
    }

    const gl = canvas.getContext("webgl");

    if(!gl){
        return;
    }

    MouseEvent.init();

    const addObject = (x, y, scale, path) =>{
        for(let i=0;i<1000;i++){
            try{
                objects.push(new GameObject({gl: gl, x: x, y: y, scale: scale, path: require(path)}));
            }catch{
                objects.push(new GameObject({gl: gl, x: x, y: y, scale: scale, path: path}));
            }
        }
    }

    const initialzieButtons = () =>{
        var b = document.querySelector("#addObject");
        b.onclick= function() {addObject(0,0,0.5,require("../Resources/Player.png"))};
    }

    const light = new Light(100, 100, -100, 1.0, 1.0, 1.0, 0.4);
    

    var objects = [new GameObject({gl: gl, x: 0, y: 0, scale: 0.5, path: require("../Resources/Player.png")})];
    
    const camera = new Camera();

    const fpsElem = document.querySelector("#fps");
    let then = 0;

    const render = (now) =>{
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        objects.forEach(object =>{
            object.draw();
        });

        console.log("Objects Number: "+objects.length);
        fpsCalc(now);

        window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);


    const fpsCalc = (now) =>{
        now *= 0.001;                          
        const deltaTime = now - then;          
        then = now;                            
        const fps = 1 / deltaTime;             
        fpsElem.textContent = fps.toFixed(1); 
    }

    
    initialzieButtons();
}

export default Init;