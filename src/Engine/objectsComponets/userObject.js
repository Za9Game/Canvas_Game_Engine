import React from "react";
import GameObject from "./gameObject";

var isKeyDown = false, keyDown='';
class userObject extends GameObject{
    constructor(props){
        super(props);
    }

    update = (canvas, ctx) =>{
        this.draw(canvas, ctx);

        try{
            eval(this.state.userCode);
        }catch{}
        
        //console.log(this.state.name + "  " + this.state.userCode);
        
    }

    keyDown = (e) =>{ 
        isKeyDown = true;
        keyDown = e.key;
        if(e.isKeyDown("e"))
            console.log("EEEEE");
        if(e.isKeyDown("r"))
            console.log("EEEEE");
        /*
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
    keyUp = () =>{
        isKeyDown = false;
    }

    setCodeUser = (e) => {
        this.state.userCode = e;
    }

}

export default userObject;