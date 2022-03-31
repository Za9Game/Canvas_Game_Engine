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
        //this.demo_draw();
/*
        this.state = {

        };
*/
    }

    draw = (ctx, canvas) =>{
        console.log(imageSrc);
        this.asyncDraw.bind(this, ctx, canvas, imageSrc);
        this.asyncDraw(ctx, canvas, imageSrc);
    }

    asyncDraw = async(ctx, canvas, ePath) => {
        var img = new Image();
        img.setAttribute('crossOrigin', '');
        img.src = ePath.default;
        img.onload = function(){
            console.log(img.src);
            ctx.drawImage(img, posX, posY, imageW, imageH, 0, 0, canvas.width, canvas.height);
        };
    }
    
    demo_draw = () =>{
        this.demo_asyncDraw.bind(this, imageSrc);
        this.demo_asyncDraw(imageSrc);
    }

    demo_asyncDraw = async(e) => {
        console.log("e fin qui..");
        var img = new Image();
        console.log(e.default);
        imageSrc = e.default;
        img.setAttribute('crossOrigin', '');
        img.src = imageSrc;
        console.log(img.src);
        img.onload = function(){
            console.log("CE LABBIAMO FATTA")
            console.log(img.src);
        };
    }

} 

export default GameObject;