import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import OrderCard from '../components/myorder/orderCard';
import { allOrdersOfUser } from '../actions/order';
import { isAuth,getCookie } from '../actions/auth';

const MyOrder = () => {
  const [orders, setOrders] = useState();
  const userId = isAuth() && isAuth()._id
  const token = getCookie('token');

  useEffect(() => {
   allOrdersOfUser(userId,token)
     .then((res) => setOrders(res.result))
  },[])


const showOrder = () => {
    return orders && orders.map((item, i) => {
      return <div key={i}>
            <br/>
            <br/>
                <h3><u>Order {i+1} </u></h3>
                <OrderCard data={item}/>
             </div>
    })
}


  return <Fragment>
          <Layout>
          <div className="container-fluid row col justify-content-center">
          <div className="text-center card col-md-9">
           <div className="myorder-page-container">
            <h1>Total Orders</h1>
               {showOrder()}
           </div>
           </div>
          </div>
          </Layout>
        </Fragment>
}




export default MyOrder;
