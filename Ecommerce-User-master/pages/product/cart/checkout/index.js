import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../../../../components/layout/layout';
import {Button} from 'antd';
import { getCartProduct } from '../../../../actions/cart';
import { createOrder, orderVerify } from '../../../../actions/order';
import { isAuth,getCookie } from '../../../../actions/auth';
import CheckoutComponent from '../../../../components/checkout/checkout';
import Private from '../../../../components/auth/Private';
import Router from 'next/router';

const Checkout = () => {
  const [cartProduct, setCartProduct] = useState();
  const userId = isAuth() && isAuth()._id
  const [orderID, setOrderID]= useState();
  const [payStatus, setPayStatus] = useState(false)
  const [orderVerification, setOrderVerification] = useState();
  const token = getCookie('token');

  useEffect(() => {
    getCartProduct(userId)
      .then(res => setCartProduct(res.result))
      .catch(err => console.log(err))

  }, [])

  const totalPrice = () => {
        const amountArray = cartProduct && cartProduct.map(item => {
              return (item.count * item.price)
        })
        if(amountArray){
          let sum = amountArray.reduce(function(a, b){
                return a + b;
            }, 0);
            return sum;
        }
  }

const product = () => {
  return cartProduct && cartProduct.map(item => {
    return {product: item.product, count: item.count, price: item.price}
  })
}


 const generateOrder = () => {
 const order = {
             userId: userId,
             products: product(),
             order_amount: totalPrice() }
   createOrder(order,token)
     .then(res => {
       setOrderID(res.order_id)
       setPayStatus(true)
     })
     .catch(err => console.log(err))
 }

 const onOrderverification = (res) => {
   if(res.payment ===0){
     return;
   }
   if(res.payment ===1){
      return Router.push(`/myorder`)
   }
   return;
 }

 const paymentHandler = () => {
    const options = {
    key: process.env.NEXT_PUBLIC_RZPID,
    amount: totalPrice()*100,
    currency: 'INR',
    name: 'Order Payment',
    order_id: orderID,

    handler(response) {
      const fuck = {
        order_id:response.razorpay_order_id,
        payment_id:response.razorpay_payment_id,
        razorpay_signature:response.razorpay_signature,
        userId: userId
      }
     orderVerify(fuck,token)
       .then((res) => onOrderverification(res))
       .catch(err => console.log(err))
      }
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open()
}

if(payStatus){
  paymentHandler()
  setPayStatus(false)
}

  return <Fragment>
          <Private>
            <Layout>
               <div className="checkoutpage-container">
                  <CheckoutComponent pay={totalPrice()} product={cartProduct}/>
               </div>
               <div className="text-center">
                 <Button size="large" className="checkoutpage-pay-now-btn" onClick={generateOrder}>
                    Pay now
                 </Button>
               </div>
            </Layout>
          </Private>
         </Fragment>
}

export default Checkout;
