import React, { useState, Fragment, useEffect } from 'react';
import { Drawer } from 'antd';
import { GiHamburgerMenu } from "react-icons/gi";
import { isAuth,signout, userProfile,getCookie } from '../../actions/auth';
import { getAllCategory } from '../../actions/category';
import Button from '@material-ui/core/Button';
import SignIn from '../auth/signinModal';
import SignUp from '../auth/signupModal';
import Router from "next/router";
import Link from 'next/link'




const App = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userAddress, setUserAddress] = useState();

  const token = getCookie('token');
  const userId = isAuth() && isAuth()._id

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const titleCase = (str) => {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

useEffect(() => {
  if(token && userId){
    userProfile(userId, token)
    .then((value) => setUserAddress(value.address.city))
    .catch((err) => {console.log(err)})
  }

  getAllCategory()
    .then((res) => setCategories(res))
    .catch(err => console.log(err))
}, [])

const showCategories = () => {
  return categories && categories.map((category, i) => {
    return <div key={i}>
             <Link href="/product/category/[pid]" as={`/product/category/${category._id}`}>
                <Button   variant="contained" className="drawer-category-btn mb-2 p-3" fullWidth onClick={() => setVisible(false)}>
                   {category.name}
                </Button>
             </Link>
           </div>
  })
}
  return (
    <Fragment>
      <GiHamburgerMenu  onClick={showDrawer} className="drawer-button-icon"/>
      <Drawer
        title={(isAuth() && `Hello  ${titleCase(isAuth().name)}`) || "Hello, Sign In"}
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={250}
      >
      <div className="pb-5">
      {isAuth() && <div className="drawer-address-container">
        <div className="drawer-address-title text-center">{userAddress}</div>
      </div>}
      {!isAuth() &&
          <div className="d-none d-sm-block d-md-none d-block d-sm-none">
              <div className="mt-1 mb-1">
                <SignUp fullWidth="true" />
              </div>
              <div className="mt-1 mb-1">
                <SignIn fullWidth="true" closeDrawer={(fuckOff) => setVisible(fuckOff)}/>
              </div>
       </div>}

       {isAuth() && <div className="mt-1 mb-1">
          <Button   variant="contained" className="drawer-my-cart-btn" fullWidth onClick={() => Router.replace('/profile')}>
            Profile
          </Button>
        </div>}

      {isAuth() && <div className="mt-1 mb-1">
         <Button   variant="contained" className="drawer-my-cart-btn" fullWidth onClick={() => Router.replace('/product/cart')}>
            My Cart
         </Button>
       </div>}

       {isAuth() && <div className="mt-1 mb-1">
          <Button   variant="contained" className="drawer-my-cart-btn" fullWidth onClick={() => Router.replace('/myorder')}>
             My Order
          </Button>
        </div>}

        <div className="mt-3 mb-2">
          <div className="drawer-subtitle">SHOP BY CATEGORY</div>
          {showCategories()}
        </div>

       {isAuth() && <div className="mt-1 drawer-signout-container">
         <Button   className="drawer-signout-btn" variant="contained" fullWidth onClick={() => signout(() => Router.replace(`/`))}>
           Sign out
         </Button>
       </div> }
    </div>
      </Drawer>
    </Fragment>
  );
};

export default App;
