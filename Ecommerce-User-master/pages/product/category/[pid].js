import React, { Fragment, useState } from 'react';
import Layout from '../../../components/layout/layout';
import { getProductByCategory, getCategoryById } from '../../../actions/category'
import ProductCard from '../../../components/product/card';

const Category = ({ data, category }) => {

  const showProduct = () => {
    return data && data.result.map((product,i) => {
      return <div className="col-md-3 m-2" key={i}>
                <ProductCard data={product} />
             </div>
    })
  }

  return <Fragment>
           <Layout>
              <div className="category-productpage-container">
                  <div className="text-center">
                    <h1 className="category-productpage-category-title">{category.name}</h1>
                  </div>
                  <div className="row col justify-content-center">
                  {showProduct()}
                  </div>
              </div>
           </Layout>
         </Fragment>
}

Category.getInitialProps = ({ query }) => {
  return getProductByCategory(query.pid)
           .then(res => {
              return getCategoryById(query.pid)
                 .then(result => {
                   return { data: res, category: result.result }
                 })
           })
}

export default Category;
