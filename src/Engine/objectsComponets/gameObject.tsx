import React from "react";

interface GameObjectInterfaceState{
    posX: number;
    posY: number;
    imageW: number;
    imageH: number;
    name: string;
    userCode: string;
}

interface GameObjectInterfaceProps{
    path: string;
    posX: number;
    posY: number;
    imageW: number;
    imageH: number;
    name: string;
    userCode: string;
}
var img:any, instantiated = false;
let imageSrc:any;

class GameObject extends React.Component<GameObjectInterfaceProps, GameObjectInterfaceState>{
    
    constructor(props: GameObjectInterfaceProps){
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

    chiamami = (name: string) =>{
        this.state = {
            ...this.state,
            name
        };
    }

    instantiate(){
        console.log(imageSrc);
        this.asyncInstantiate(imageSrc);
    }
    asyncInstantiate = async(e:any) => {
        img = new Image();
        img.setAttribute('crossOrigin', '');
        imageSrc = e.default;
        img.src = imageSrc;
        img.onload = this.loadedImage.bind(this, img.width, img.height);
    }

    loadedImage = (width:number, height:number) => {
        instantiated = true;
        console.log(this.state);
        this.state = {
            ...this.state,
            imageW: width * this.state.imageW,
            imageH: height * this.state.imageH
        };
        
        console.log("Instanziata"+img.src + "  " + this.state.imageW + "   " + this.state.imageH);
    }

    draw = (canvas:any, ctx:any) =>{
        if(instantiated){
            //instantiated = false;
            //console.log(img + "   " + posX + "   " + posY + "   " + imageW + "   " + imageH);
            ctx.drawImage(img, this.state.posX, this.state.posY,this.state.imageW, this.state.imageH);
        }    
    }

    keyUp = () =>{
        try{
            this.keyUp();
        }
        catch{}
    }

    keyDown = (e:any) =>{
        try{
            this.keyDown(e);
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