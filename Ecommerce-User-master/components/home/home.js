import React, { Fragment } from 'react';


const Home = () => {
  return <Fragment>
          <div className="homepage-banner-1">
             <div className="row col justify-content-center">
               <div className="col-4 text-center pt-2">
                   <img src="static/images/shoppping-bag.svg" className="hompage-banner-1-image-1" />
               </div>
               <div className="col-7">
               <h1 className="homepage-banner-1-title">Delivery at your doorstep</h1>
               </div>
             </div>
          </div>
          <div className="homepage-banner-2">
           Welcome to geekstore.com, Buy products online in a fast, easy and simple way.
          </div>
          <div className="homepage-banner-3">
           <div className="row col justify-content-center">
              <div className="col-md-2 homepage-banner-3-1">
                <div className="row col">
                   <div className="col-6">
                      <img src="static/images/banner24.svg" className="banner-3-image" />
                   </div>
                   <div className="col-6">
                   <h6 className="homepage-banner-3-text">Shop globally</h6>
                   </div>
                </div>
              </div>
              <div className="col-md-2 homepage-banner-3-2">
              <div className="row col">
                 <div className="col-6">
                    <img src="static/images/banner23.svg" className="banner-3-image" />
                 </div>
                 <div className="col-6">
                  <h6 className="homepage-banner-3-text">Secure Payment</h6>
                 </div>
              </div>
              </div>
              <div className="col-md-2 homepage-banner-3-3">
              <div className="row col">
                 <div className="col-6">
                    <img src="static/images/banner21.svg" className="banner-3-image" />
                 </div>
                 <div className="col-6">
                   <h6 className="homepage-banner-3-text">24/7 Customer services</h6>
                 </div>
              </div>
              </div>
              <div className="col-md-2 homepage-banner-3-4">
              <div className="row col">
                 <div className="col-6">
                    <img src="static/images/banner25.svg" className="banner-3-image" />
                 </div>
                 <div className="col-6">
                  <h6 className="homepage-banner-3-text">Track your package</h6>
                 </div>
              </div>
              </div>
           </div>
          </div>
         </Fragment>
}
export default Home;
