import React, { Fragment, useEffect } from 'react';
import Layout from '../components/layout/layout'
import Home from '../components/home/home'
import { homepageProducts } from '../actions/product'
import CarouselContainer from '../components/carousel/carousel'
import openSocket from 'socket.io-client';


const App = ({ data }) => {
useEffect(() => {
  const socket = openSocket(process.env.NEXT_PUBLIC_SERVER);
  if(process.browser===window){socket.on('online')}
},[])
// !(data.result == null)
 const showCarousel = () => {
   return  data && data.map((item,i) => {
     return <Fragment key={i}>
              <CarouselContainer products={item} />
            </Fragment>
    })
 }


  return <Fragment>
           <Layout>
             <Home />
             <div className="container">
               {showCarousel()}
             </div>
           </Layout>
         </Fragment>
}

App.getInitialProps = () => {
    return homepageProducts()
     .then((res) => {
       return { data: res }
     })

}

export default App;
