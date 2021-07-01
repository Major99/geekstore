import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../../core/layout';
import { Divider} from 'antd';
import { getCategory } from '../../../actions/category';
import { createProductByCategory, getPdtCat,updateProductByCatgory } from '../../../actions/prodcat';
import CategoryInput from './category-input';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import {isAuth, getCookie} from '../auth/helpers'

import './manage.css';

const Manage = () => {
  const [categories, setCategories] = useState();
  const [pdtcat, setPdtCat] = useState();
  const [categoryStackID, setCategoryStackID] = useState();
  const [categoryStackName, setCategoryStackName] = useState();
  const token = getCookie('token')


  useEffect(() => {
       getPdtCat()
          .then(value => setPdtCat(value.prodcat))
          .catch(err => console.log(err))

        getCategory()
        .then(res => {
           setCategories(res)
        })
        .catch(err => console.log(err))
    }, [])


  const stackListID = (listID) => {
    setCategoryStackID(listID)
  }

  const stackListName = (listName) => {
    setCategoryStackName(listName)
  }


  const createProdCat = () => [
      createProductByCategory({ categories: categoryStackID },token)
        .then(res => {
          toast.success(res.message)
          getPdtCat()
             .then(value => setPdtCat(value.prodcat))
             .catch(err => console.log(err))
        })
        .catch(err => toast.error(err.error))
  ]

  const updateProdCat = () => {
      updateProductByCatgory({ categories: categoryStackID },token)
        .then(res => {
          toast.success(res.message)
          getPdtCat()
            .then(value => setPdtCat(value.prodcat))
            .catch(err => console.log(err))

        })
        .catch(err => toast.error(err.error))



  }


  const showSelectedCategories = () => {
     return pdtcat && pdtcat.map((item,i) => {
      return <div className="  each-selected-category" key={i}>
             {item.name}
             </div>
     })
  }


  return <Fragment>
             <Layout>
                 <ToastContainer />
             <div className='container text-center'>
                 <Divider orientation="left"><h1>Manage</h1></Divider>
                <div className="container manage-container">
                <small>*** Manage homepage products by categories ***</small>
                  <div className="row col">
                    <div className="col-md-6  text-center">
                      <CategoryInput data={categories} listID={stackListID} listName={stackListName}/>
                    </div>
                    <div className="col-md-6  selected-category text-center">
                      {showSelectedCategories()}
                    </div>
                  </div>
                  <div className="pt-2">
                {pdtcat === (undefined) && <Button
                       variant="contained"
                       className="m-1"
                       color="primary"
                       onClick={createProdCat}>
                    Create
                  </Button>}

                {(pdtcat || pdtcat ===null) && <Button
                       variant="contained"
                       color="primary"
                       onClick={updateProdCat}>
                    Update
                  </Button>}
                  </div>
                </div>
             </div>
             </Layout>
         </Fragment>
}

export default Manage;
