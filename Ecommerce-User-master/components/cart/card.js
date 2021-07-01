import React, { Fragment, useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { GrAdd,GrSubtract } from "react-icons/gr";
import {incrementCountCart, decrementCountCart} from '../../actions/cart';
import { getCookie } from '../../actions/auth'
const Cart = ({ data }) => {

const [count, setCount] = useState();
const token = getCookie('token');

const increment = () => {
  incrementCountCart(data._id, data.product,token)
     .then((value) => setCount(value.data.count))
     .catch((err) => { console.log(err)})
}

const decrement = () => {
  decrementCountCart(data._id, data.product,token)
     .then((value) =>  setCount(value.data.count))
     .catch((err) => { console.log(err)})
}


  return <Fragment>
            <div className="cart-card">
                 <img src="https://img.grouponcdn.com/deal/3H5QzVtGHYD8P51AMbu7KD1QoLr4/3H-1561x937/v1/c700x420.jpg" className="img img-fluid"/>

                 <div className="cart-card-title">
                   {data.name}
                 </div>

                 <div className="container mb-5">
                 {count || data.count}
                 </div>

                 <div className="cart-card-price-container row">
                   <div className="col">
                   <IconButton color="primary"  component="span" onClick={decrement}>
                     <GrSubtract />
                   </IconButton>
                   </div>

                   <div className="pt-2 col-7 cart-card-price">
                    Price: ₹{data.price}
                   </div>

                   <div className="col">
                   <IconButton color="primary" component="span" onClick={increment}>
                     <GrAdd />
                   </IconButton>
                   </div>
                 </div>

            </div>
         </Fragment>
}

export default Cart;
