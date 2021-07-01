import React, {Fragment, useState} from 'react';
import Layout from '../../../components/layout/layout';
import { getProductBySlug } from '../../../actions/product';
import ProductCard from '../../../components/product/checkoutCard';
import { createOrder, orderVerify } from '../../../actions/order';
import { isAuth,getCookie } from '../../../actions/auth';
import Private from '../../../components/auth/Private'
import { Button } from 'antd';
import Router from 'next/router';

const Checkout = ({ data }) => {

  const userId = isAuth() && isAuth()._id
  const [orderID, setOrderID]= useState();
  const [count, setCount] = useState(1);
  const [payStatus, setPayStatus] = useState(false)
  const [orderVerification, setOrderVerification] = useState();
  const token = getCookie('token');

 const showProduct = () => {
     return  <div className="product-checkout-page-card card col-md-4 col-sm-5 p-2">
              <ProductCard data={data} value={onCount}/>
            </div>
 }


  const onCount = (value) => {
      setCount(value)
   }

 const generateOrder = () => {
 const order = {
             userId: userId,
             products: [{product: data._id, count: count, price: data.price}],
             order_amount: count*data.price }

   createOrder(order,token)
     .then(res => {
       console.log(res)
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
     amount:  count*data.price,
     currency: 'INR',
     name: 'Payments',
     order_id: orderID,

     handler(response) {
       const fuck = {
         order_id:response.razorpay_order_id,
         payment_id:response.razorpay_payment_id,
         razorpay_signature:response.razorpay_signature,
         userId: userId
       }
      orderVerify(fuck,token)
        .then((res) =>  onOrderverification(res))
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
               <div className="product-checkout-page-container row justify-content-center">
                {showProduct()}
               </div>
               <div className="container text-center mt-4">
                <Button className="product-checkout-pay-btn" onClick={generateOrder}>
                  Pay
                </Button>
               </div>
            </Layout>
          </Private>
         </Fragment>
}

Checkout.getInitialProps = ({ query }) => {
  return getProductBySlug(query.pid)
          .then((res) => {
             return { data: res.result }
          })
}

export default Checkout;
