import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Activate from '../pages/auth/activate/activate';
import PrivateRoute from '../pages/auth/privateRoute';
import AdminRoute from '../pages/auth/adminRoute';
import Forgot from '../pages/auth/forgot/forgot';
import Signin from '../pages/auth/signin/signin';
import Reset from '../pages/auth/reset/reset';
import Dashboard from '../pages/dashboard/dashboard'
import Product from '../pages/product/product'
import AddProduct from '../pages/product/add-product'
import EditProduct from '../pages/product/edit-product'
import Category from '../pages/category/category';
import AddCategory from '../pages/category/add-category'
import EditCategory from '../pages/category/edit-category'
import Activity from '../pages/activity/activity'
import Manage from '../pages/manage/manage'
import Users from '../pages/users/users';
// import Home from '../pages/home/home';
import Orders from '../pages/orders/orders';
import Private from './private';
import Admin from './admin';
import React from 'react';


const Routes = () => {
  return (
     <BrowserRouter>
       <Switch>
          <Route path='/' exact component={Signin} />
          <Route path="/auth/activate/:token" exact component={Activate} />
          <PrivateRoute path="/private" exact component={Private} />
          <AdminRoute path="/dashboard" exact component={Dashboard} />
          <AdminRoute path="/product" exact component={Product} />
          <AdminRoute path="/product/add-product" exact component={AddProduct} />
          <AdminRoute path="/product/edit-product/:productId" exact component={EditProduct} />
          <AdminRoute path="/category" exact component={Category} />
          <AdminRoute path="/category/add-category" exact component={AddCategory} />
          <AdminRoute path="/category/edit-category/:categoryId" exact component={EditCategory} />
          <AdminRoute path="/users" exact component={Users} />
          <AdminRoute path="/admin" exact component={Admin} />
          <AdminRoute path="/activity" exact component={Activity} />
          <AdminRoute path="/orders" exact component={Orders} />
          <AdminRoute path="/manage" exact component={Manage} />
          <Route path="/auth/password/forgot" exact component={Forgot} />
          <Route path="/auth/password/reset/:token" exact component={Reset} />
       </Switch>
     </BrowserRouter>
  )
}

export default Routes;
