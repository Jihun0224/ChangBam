import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './PhotoSlide.css';

export default class MyUploader extends Component{
  
	render() {
    if(this.props.pictures != undefined){
		return (
			<div className="PhotoSlide">
			 <Slide easing="ease" indicators={true}>
         {this.props.pictures.map((picture) => (
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${picture})`}}>
            </div>
          </div>
         ))}  
        </Slide>
		  </div>
		);}
    else{
      return(
        <></>
      )
    }
	}
}