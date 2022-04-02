import React from "react";

var img, instantiated = false;
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
        this.instantiate();
/*
        this.state = {

        };
*/
    }

    instantiate(){
        console.log(imageSrc);
        this.asyncInstantiate.bind(this, imageSrc);
        this.asyncInstantiate(imageSrc);
    
    }
    asyncInstantiate = async(e) => {
        img = new Image();
        img.setAttribute('crossOrigin', '');
        imageSrc = e.default;
        img.src = imageSrc;
        img.onload = function(){
            instantiated = true;
            imageW = this.width * imageW;
            imageH = this.height * imageH;
            
            console.log("Instanziata"+img.src);
        };
    }

    draw = (ctx, canvas) =>{
        if(instantiated){
            ctx.drawImage(img, posX, posY,imageW, imageH);
        }    
    }


    keyDown = (e) =>{
        console.log(e.key);
        switch(e.key){
            case 'w':
                posY -= 1;
                break;
            case 'a':
                posX -= 1;
                break;
            case 's':
                posY += 1;
                break;
            case 'd':
                posX += 1;
                break;
        }
    }

} 

export default GameObject;