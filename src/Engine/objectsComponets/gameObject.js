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
/*
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
    }*/
    
    demo_draw = (e) =>{
        this.demo_asyncDraw.bind(this, imageSrc);
        this.demo_asyncDraw(imageSrc);
    }

    demo_asyncDraw = async(e) => {
        console.log("e fin qui..");
        var img = new Image();
        console.log(imageSrc);
        img.src = imageSrc;
        img.onload = function(){
            console.log("CE LABBIAMO FATTA")
            console.log(img.src);
        };
    }

} 

export default GameObject;