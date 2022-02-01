import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ImageGallery from 'react-image-gallery';

import './Slider.css'

export default class Slider extends Component {
  render() {

    const {images}=this.props;
    const temp=[];
    images.map((val)=>{
      temp.push({original:val.thumbnail.url,thumbnail:val.thumbnail.url})
    })
    return(
     <>
       <div className="banner-container">
      <div className="carousl">
       <ImageGallery items={temp} thumbnailPosition={'left'} showBullets={true}></ImageGallery>
      </div>
      </div>
     </>);
  }
}
