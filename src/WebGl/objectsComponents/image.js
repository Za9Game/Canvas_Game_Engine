import React from "react";
import imageToBase64 from 'image-to-base64/browser';

var path;
var addDifuse;

class Image extends React.Component{
    constructor(props){
        super(props);
        path = props.path;
        addDifuse = props.addDifuse;

        this.state = {
            baseImage: ''
        };

        this.uploadImage.bind(this, path);
        this.uploadImage(path);
    }
    
    uploadImage = async(e) => {
        let filePath = e.default;
        this.state.baseImage = filePath;
        addDifuse(this.state.baseImage);
    }
    
}

export default Image;