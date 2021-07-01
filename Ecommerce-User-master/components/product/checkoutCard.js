import React, { Fragment, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { GrAdd,GrSubtract } from "react-icons/gr";



const Card = ({ data, value }) => {
    var [count, setCount] = useState(1);

   const onIncrement = () => {
      setCount(count=count+1)
        return value(count)

   }

   const onDecrement = () => {
   setCount(count = count -1)
      return value(count)
   }

  return <Fragment>
              <div className="cart-card">
                   <img src="https://cdn.shopify.com/s/files/1/0070/7032/files/camera_56f176e3-ad83-4ff8-82d8-d53d71b6e0fe.jpg?v=1527089512" className="img img-fluid"/>

                   <div className="cart-card-title">
                     {data.name}
                   </div>

                   <div className="container mb-5">
                     {count}
                   </div>

                   <div className="cart-card-price-container row">
                     <div className="col">
                     <IconButton color="primary"  component="span"  onClick={onDecrement}>
                       <GrSubtract />
                     </IconButton>
                     </div>

                     <div className="pt-2 col-7 cart-card-price">
                      Price: ₹{data.price}
                     </div>

                     <div className="col">
                     <IconButton color="primary" component="span"  onClick={onIncrement}>
                       <GrAdd />
                     </IconButton>
                     </div>
                   </div>

              </div>
         </Fragment>
}

export default Card;
