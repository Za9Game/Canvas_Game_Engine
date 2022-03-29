import React from "react";

let imageSrc;
let posX, posY, imageW, imageH;

class GameObject extends React.Component{
    constructor(props){
        super(props);

        imageSrc = props.path;
        posX = props.posX;
        posY = props.posY;
        imageW = props.imageW;
        imageH = props.imageH;
        this.demo_draw();
/*
        this.state = {

        };
*/
    }

    draw = (ctx, canvas) =>{
        
        this.asyncDraw.bind(this, ctx, canvas);
        this.asyncDraw(ctx, canvas);
    }

    asyncDraw = async(ctx, canvas) => {
        var img = new Image();
        img.src = imageSrc;
        img.onload = function(){
            console.log(imageSrc);
            ctx.drawImage(img, posX, posY, imageW, imageH, 0, 0, canvas.width, canvas.height);
        };
    }
    
    demo_draw = () =>{
        
        this.demo_asyncDraw.bind(this);
        this.demo_asyncDraw();
    }

    demo_asyncDraw = async() => {
        var img = new Image();
        img.src = imageSrc;
        console.log(imageSrc);
        img.onload = function(){
            console.log(imageSrc);
        };
    }

} 

export default GameObject;