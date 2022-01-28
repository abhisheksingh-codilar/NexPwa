import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Slider.css'

export default class Slider extends Component {
  render() {

    const {images}=this.props;
    return(
     <>
       <Carousel className='main-slider'>

         {
           images.map((image)=>{
             return(
               
    
              <img src={image.thumbnail.url} alt=''/>
             )
           })
  }
                   
                </Carousel>
     </>);
  }
}
