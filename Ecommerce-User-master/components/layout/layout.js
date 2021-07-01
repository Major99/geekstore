import React, { Fragment } from 'react';
import Header from '../header/header';
import Router from "next/router";
import NProgress from "nprogress";
import Footer from '../footer/footer';
import {BackTop} from "antd";


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Layout = ({ children, data }) => {
     return <Fragment>
             <Header data={data}/>
             <BackTop/>
             {children}
             <Footer/>
            </Fragment>
}
export default Layout;
