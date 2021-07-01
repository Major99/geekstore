import React, { Fragment, useState } from 'react';
import Layout from '../../components/layout/layout';
import { isAuth ,getCookie} from '../../actions/auth';
import { getProductBySlug,listRelatedProducts } from '../../actions/product';
import  ProductCard from '../../components/product/card';
import { addToCart } from '../../actions/cart'
import { withRouter } from 'next/router';
import { Button,Breadcrumb,Tag } from 'antd';
import { FaShoppingCart,FaHeartbeat } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'
import ImageGallery from 'react-image-gallery';

import renderHTML from 'react-render-html';




const Product = ({ data, router, slug, relatedProducts }) => {


  const images = [
    {
      original: data.result.photoURL,
      thumbnail: data.result.photoURL,
    }
  ];

  const [cartItem, setCartItem] = useState(0);
  const token = getCookie('token');

  const product = {
    product: data && data.result._id,
    name: data && data.result.name,
    price: data && data.result.price,
    user: isAuth() && isAuth()._id
  };

  const cart = () => {
    addToCart(product,token)
       .then(res => {
          toast.success(res.message)
          if(res.res=="ok"){
              setCartItem(1)
              }
            }
       )
       .catch(err => {
         console.log(err)
         toast.error(err.error)
       })
  }


    const showRelatedProducts = () => {
        return relatedProducts && relatedProducts.map((product, i) => {
              return <div className="col-md-3 col-sm-3 col-lg-3 m-2" key={i}>
                       <ProductCard data={product} />
                     </div>
        });
    };


  return <Fragment>
           <Layout data={cartItem}>
          <ToastContainer />
              {/* <div className="row col justify-content-center product-detail-container">
                <div className="col-md-5 p-1">
                 <img className="img img-fluid" src="https://img.grouponcdn.com/deal/3H5QzVtGHYD8P51AMbu7KD1QoLr4/3H-1561x937/v1/c700x420.jpg"/>
                </div>
                <div className="col-md-2 p-2 text-center pt-5">
                  <div className="pt-3 pb-5">
                    <div className="product-detail-price pb-3">
                      ₹{data.result.price}
                    </div>
                    <div className="p-1 mb-3">
                       <Button size="large" className="product-detail-add-cart-btn" onClick={cart}>
                           <IoMdCart className="product-detail-add-cart-btn-icon"/>
                            Add to Cart
                       </Button>
                    </div>
                    <div className="p-1">
                    <Link href="/product/checkout/[pid]" as={`/product/checkout/${slug}`}>
                      <Button size="large" className="product-detail-buy-btn">
                        <FaHeartbeat className="product-detail-buy-btn-icon"/>
                         Buy Now
                      </Button>
                    </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 p-2">
                <div className="product-detail-pdt-name">
                  {data.result.name}
                </div>
                </div>
              </div> */}
    <div >
    <section className="page-add" >
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="page-breadcrumb">
                        <h2>{data.result.category.name}<span>.</span></h2>
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                  <Link href='/'>
                                     <a>Home</a>
                                  </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                  <Link href={`/product/category/${data.result.category._id}`}>
                                     <a>{data.result.category.name}</a>
                                  </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>{data.result.name}</Breadcrumb.Item>
                            </Breadcrumb>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="product-page" >
        <div className="container">
            <div className="row">
                <div style={{width: "25rem", height: "25rem"}}>
                    <ImageGallery
                      items={images}
                      showBullets={false}
                      showIndex={true}
                      lazyLoad={true}
                      showPlayButton={false}/>
                </div>
                <div className="col-lg-6">
                    <div className="product-content">
                        <h2>{data.result.name}</h2>
                        <div className="pc-meta">
                            <h5>₹{data.result.price}</h5>
                            <div className="rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                        </div>
                       {renderHTML(data.result.description)}
                        {/*<ul className="tags">
                            <li><span>Category :</span> Category</li>
                            <li><span>Tags :</span> <Tag color="magenta">Tag1</Tag>
                                                    <Tag color="red">Tag2</Tag>
                                                    <Tag color="volcano">Tag3</Tag>
                                                    <Tag color="orange">Tag4</Tag>
                                                    <Tag color="gold">Tag5</Tag>
                                                    <Tag color="lime">Tag6</Tag>
                                                    <Tag color="green">Tag6</Tag>
                                                    <Tag color="cyan">Tag7</Tag>
                                                    <Tag color="blue">Tag8</Tag>
                                                    <Tag color="geekblue">Tag9</Tag>
                                                    <Tag color="purple">Tag10</Tag></li>
                        </ul>*/}
                        <div className="p-1 mb-3">
                        <Button size="large" className="product-detail-add-cart-btn" onClick={cart}>
                            <IoMdCart className="product-detail-add-cart-btn-icon"/>
                                Add to Cart
                        </Button>
                        </div>
                        <div className="p-1">
                        <Link href="/product/checkout/[pid]" as={`/product/checkout/${slug}`}>
                        <Button size="large" className="product-detail-buy-btn">
                            <FaHeartbeat className="product-detail-buy-btn-icon"/>
                            Buy Now
                        </Button>
                        </Link>
                        </div>
                      {/*  <ul className="p-info">
                            <li>Product Information</li>
                            <li>Reviews</li>
                            <li>Product Care</li>
                        </ul>*/}
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section className="related-product spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="section-title">
                        <h2>Related Products</h2>
                    </div>
                </div>
            </div>
            <div className="row col justify-content-center">
                  {showRelatedProducts()}
            </div>
        </div>
    </section>
    </div>
           </Layout>
         </Fragment>
}

Product.getInitialProps = ({ query }) => {
     return getProductBySlug(query.pid)
             .then((res) => {
                   return listRelatedProducts({ _id: res.result._id, category: res.result.category._id })
                          .then(related => {
                         return { data: res, slug:query.pid, relatedProducts: related }
                          })
             })
}
export default withRouter(Product);
