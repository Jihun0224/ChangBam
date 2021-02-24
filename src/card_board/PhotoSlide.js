import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './PhotoSlide.css';
import image1 from './PhotoSlideTestImages/image1.jpg';
import image2 from './PhotoSlideTestImages/image2.jpg';
import image3 from './PhotoSlideTestImages/image3.jpg';

export default class MyUploader extends Component {
	
	render() {
		const slideImages = [
			image3,
			image1,
			image2
		  ];
		return (
			<div className="tt">
			 <Slide easing="ease">
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            </div>
          </div>
        </Slide>
		  </div>
		);
	}
}