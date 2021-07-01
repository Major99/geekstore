import React, { Fragment, useState, useEffect } from 'react';
import Layout from '../../../components/layout/layout';
import CartCard from '../../../components/cart/card';
import { getCartProduct } from '../../../actions/cart'
import { isAuth } from '../../../actions/auth';
import { Button } from 'antd';
import Link from 'next/link'

const Cart = () => {
const [cart, setCart] = useState([]);
const userId = isAuth() && isAuth()._id;

  useEffect(() => {
    getCartProduct(userId)
       .then(res => setCart(res))
       .catch(err => console.log(err))
  },[])

  const showCartProduct = () => {
      return cart && cart.result && cart.result.map((product,i) => {
           return <div className="m-3 card col-lg-2 col-md-3 col-sm-4" key={i}>
                   <CartCard data={product} />
                  </div>
      })
  }

  return <Fragment>
            <Layout>
                <div className="cartpage-container pb-3">
                        <h1 className="cartpage-title pt-3">Cart</h1>
                        <div className="row col justify-content-center">
                            {showCartProduct()}
                        </div>
                        <div className="text-center mt-5">
                         <Link href="/product/cart/checkout">
                           <a>
                          <Button size="large" className="cartpage-checkout-btn">
                             Checkout
                          </Button>
                          </a>
                          </Link>
                        </div>
                </div>

            </Layout>
         </Fragment>
}

export default Cart;
