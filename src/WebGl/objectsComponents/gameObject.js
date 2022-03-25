import React from "react";
import Image from "../objectsComponents/image";
import Sprite from "./Sprite";
import {Point} from "../Utils/maths";

var path;
var image;
var material;
var gl;
var position;

class GameObject extends React.Component{
    constructor(props){
        super(props);
        path = props.path;
        gl = props.gl;

        this.state = {
            sprite: new Sprite(gl, path, {width:64, height:64})
            //image:  new Image({ path: path, addDifuse:material.addDiffuse })
            //instanced: new ModelInstance(props.x, props.y, 0, 180, 0, 0, props.scale) 
        };

        this.instance();
    }

    instance = () => {

		position = new Point();        
        //this.state.modelRender.registerNewModel(modelType, 'cube');


        //this.state.modelRender.addInstance(this.state.instanced, 'cube');
    }

    draw = () =>{
		this.state.sprite.render(position, 0);
        //this.state.instanced.updateRotation(0, 0, Math.random());
    }
    
    
}

export default GameObject;