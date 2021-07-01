import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../pages/auth/helpers';
import React, { Fragment } from 'react';
import { Button } from 'antd';
import Sidebar from './sidebar/sidebar';
 

const Layout = ({ children, match, history }) => {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#512da8', fontWeight:"bold" };
        } else {
            return { color: 'black' };
        }
    };

    const nav = () => (
        <ul className="container text-center pt-2">


            {isAuth() && isAuth().role === 'subscriber' && (
                   <Button ghost>
                    <Link className="mr-2 ml-2" style={isActive('/private')} to="/private">
                      {isAuth().name}
                    </Link>
                  </Button>
            )}


        </ul>
    );

    return (
        <Fragment>
            {nav()}
            {isAuth() && isAuth().role==='admin' && <Sidebar />}
            <div className=" ">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);
