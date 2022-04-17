import React from "react";

var img, instantiated = false;
let imageSrc;

class GameObject extends React.Component{
    constructor(props){
        super(props);

        imageSrc = props.path;
        this.instantiate();

        this.state = {
            posX : props.posX,
            posY : props.posY,
            imageW : props.imageW,
            imageH : props.imageH,
            name: props.name,
            userCode: ""
        };

    }
    chiamami = (name) =>{
        this.state.name = name;
    }

    instantiate(){
        console.log(imageSrc);
        this.asyncInstantiate.bind(this);
        this.asyncInstantiate(imageSrc);
    }
    asyncInstantiate = async(e) => {
        img = new Image();
        img.setAttribute('crossOrigin', '');
        imageSrc = e.default;
        img.src = imageSrc;
        img.onload = this.loadedImage.bind(this, img.width, img.height);
    }

    loadedImage = (width, height) => {
        instantiated = true;
        console.log(this.state);
        this.state.imageW = width * this.state.imageW;
        this.state.imageH = height * this.state.imageH;
        
        console.log("Instanziata"+img.src + "  " + this.state.imageW + "   " + this.state.imageH);
    }

    draw = (canvas, ctx) =>{
        if(instantiated){
            //instantiated = false;
            //console.log(img + "   " + posX + "   " + posY + "   " + imageW + "   " + imageH);
            ctx.drawImage(img, this.state.posX, this.state.posY,this.state.imageW, this.state.imageH);
        }    
    }

    keyUp = () =>{
        try{
            super.keyUp();
        }
        catch{}
    }

    keyDown = (e) =>{
        try{
            super.keyDown(e);
        }
        catch{/*
            switch(e.key){
                case 'w':
                    this.state.posY -= 1;
                    break;
                case 'a':
                    this.state.posX -= 1;
                    break;
                case 's':
                    this.state.posY += 1;
                    break;
                case 'd':
                    this.state.posX += 1;
                    break;
            }*/
        }
    }

} 

export default GameObject;