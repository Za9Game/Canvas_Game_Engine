import React from "react";
import GameObject from "./gameObject";

class upGameObject extends GameObject{
    constructor(props){
        super(props);
    }

    keyDown = (e) =>{
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
        }
    }



}