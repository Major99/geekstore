import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../core/layout';
import { Divider} from 'antd';
import { getAllOrders } from '../../../actions/order';

const Order = () => {
   const [orders, setOrders] = useState();

  useEffect(() => {
     getAllOrders()
     .then((value) => {
       setOrders(value.result)
     })
    .catch((err) => {
      console.log(err)
    })
  }, [])

 
  return <Fragment>
           <Layout>
              <div className="container text-center">
                 <Divider orientation="left"><h1>Orders</h1></Divider>
              </div>
           </Layout>
         </Fragment>
}

export default Order;
