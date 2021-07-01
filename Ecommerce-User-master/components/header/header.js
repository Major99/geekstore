import React, { Fragment, useEffect, useState } from 'react';
import Drawer from './drawer';
import Search from './search';
import {Button} from 'antd';
import SignIn from '../auth/signinModal';
import SignUp from '../auth/signupModal';
import { isAuth } from '../../actions/auth';
import { getCartProduct } from '../../actions/cart';
import Link from 'next/link'
import { GrCart } from "react-icons/gr";
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    color:"white",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



const Header = ({ data }) => {

  const classes = useStyles();


  var [cartItem, setCartItem] = useState(0);
  const userId = isAuth() && isAuth()._id;
  const [state,setState] = useState(true)

  useEffect(() => {
    if(userId){
      getCartProduct(userId)
           .then(res => setCartItem(res.result.length))
           .catch(err => console.log(err))
    }
  },[])



  const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );




  const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

 while (data==1 && state) {
  setCartItem(cartItem= cartItem + data)
  setState(false)
  return;
 }


  return <Fragment>
  <div className={classes.grow}>
     <AppBar position="fixed">
       <Toolbar>
         <IconButton
           edge="start"
           className={classes.menuButton}
           color="inherit"
           aria-label="open drawer"
         >
          <Drawer />
         </IconButton>
         <Typography className={classes.title} variant="h6" noWrap>
           <Link href="/">
             <a>
               Geekstore
             </a>
             </Link>
         </Typography>
         <div className={classes.search}>
           <div className={classes.searchIcon}>
             <SearchIcon />
           </div>
            <Search />
         </div>
         <div className={classes.grow} />
         <div className="row">
          <Link href="/product/cart">
             <a>
                <IconButton>
                  <StyledBadge badgeContent={cartItem} color="secondary">
                    <ShoppingCartIcon className="header-cart-icon"/>
                  </StyledBadge>
                </IconButton>
            </a>
          </Link>
        {
          !isAuth() &&
          <div className="d-none d-md-block d-lg-none d-lg-block d-xl-block">
              <div className="row  header-access-container pt-2">
                 <SignIn size="small"/>
                 <SignUp size="small"/>
              </div>
          </div>
        }
         </div>
       </Toolbar>
     </AppBar>
     {renderMobileMenu}
     {renderMenu}
   </div>


        { /* <div className="header-nav-bar">
            <div className="row col">
                <div className="col-1 header-col-1">
                 <Drawer />
                </div>
                <div className="col-2 header-col-2">
                <Link href="/"><a>Geekstore</a></Link>
                </div>
                <div className="col-md-5 header-col-3">
                 <Search />
                </div>
                <div className="col-4 col-sm-4 header-col-5 pt-1 row justify-content-center">
                  <div className="d-none d-md-block d-lg-none d-lg-block d-xl-block">
                    <Link href="/product/cart">
                      <a>
                         <IconButton>
                           <StyledBadge badgeContent={cartItem} color="secondary">
                             <ShoppingCartIcon className="header-cart-icon"/>
                           </StyledBadge>
                         </IconButton>
                     </a>
                   </Link>
                 </div>
                 {
                   !isAuth() &&
                   <div className="d-none d-md-block d-lg-none d-lg-block d-xl-block">
                       <div className="row   header-access-container ">
                          <SignIn size="small"/>
                          <SignUp size="small"/>
                       </div>
                   </div>
                 }
                </div>
            </div>
          </div>*/}
         </Fragment>
}

export default Header;
