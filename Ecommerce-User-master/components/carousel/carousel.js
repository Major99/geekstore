import React, { Fragment } from 'react';
import Card from '../product/card';
import dynamic from 'next/dynamic'
const Carousel = dynamic(() => import('react-multi-carousel'),{ ssr: true})


const CarouselContainer = ({ products }) => {

 const showProduct = () => {
   return products.map((x,i) => {
   return  <div className="carousel-card-style shadow" key={i}>
             <Card data={x} key={i} />
           </div>
   })
 }

 const responsive = {
  superLargeDesktop: {

    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

  return  <div className="carousel-container">
           <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            responsive={responsive}>
            {showProduct()}
          </Carousel>
       </div>
}

export  default CarouselContainer;
