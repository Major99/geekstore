import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Settings from '@material-ui/icons/Settings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LayersIcon from '@material-ui/icons/Layers';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AddIcon from '@material-ui/icons/Add';
import CategoryIcon from '@material-ui/icons/Category';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import ChatIcon from '@material-ui/icons/Chat';
import { Link, withRouter } from 'react-router-dom'
import { isAuth, signout } from '../../pages/auth/helpers';

import './sidebar.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested:{

  }
}));








const  MiniDrawer = ({ match, history }) => {
  const classes = useStyles();
  const theme = useTheme();


  const [openProductCollapse, setOpenProductCollapse] = useState(false);
  const [openCategoryCollapse, setOpenCategoryCollapse] = useState(false);

function handleOpenProduct(){
   setOpenProductCollapse(!openProductCollapse);
}

function handleOpenCategory(){
   setOpenCategoryCollapse(!openCategoryCollapse);
}

  const isActive = path => {
      if (match.path === path) {
          return { color: 'white', fontWeight:"bold", backgroundColor: "rgba(250,250,250,.2)" };
      } else {
          return { color: 'white' };
      }
  };

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
        {open===false && <IconButton onClick={handleDrawerOpen}>
          <ChevronRightIcon style={{ color: "#7d7c7c" }}/>
        </IconButton>}
          {open===true && <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{ color: "#7d7c7c"}}/>
          </IconButton>}
        </div>
        <Divider />



        <List>
          <Link to="/dashboard">
                <ListItem style={isActive('/dashboard')}>
                <ListItemIcon><HomeIcon  className='sidebar-icons' /></ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItem>
          </Link>

          <ListItem button onClick={handleOpenProduct} className='mt-3'>
             <ListItemIcon>
               <WidgetsIcon  className='sidebar-icons' />
             </ListItemIcon>
             <ListItemText primary="Product" className='sidebar-icons'/>
             {openProductCollapse ? <ExpandLess style={{ color: "#7d7c7c" }}/> : <ExpandMore style={{ color: "#7d7c7c" }}/>}
           </ListItem>

           <Collapse in={openProductCollapse} timeout="auto" unmountOnExit>


           <List component="div" disablePadding   className=''>
           <Link to="/product">
             <ListItem button className={classes.nested} style={isActive('/product')}>
               <ListItemIcon>
                 <LineWeightIcon className='sidebar-icons'/>
               </ListItemIcon>
               <ListItemText primary='See Products' />
             </ListItem>
           </Link>

          <Link to='/product/add-product'>
             <ListItem button className={classes.nested} style={isActive('/product/add-product')}>
               <ListItemIcon>
                <AddIcon  className='sidebar-icons' />
               </ListItemIcon>
               <ListItemText primary='Add Product' />
             </ListItem>
          </Link>
           </List>
         </Collapse>

         <ListItem button onClick={handleOpenCategory} className='mt-3'>
            <ListItemIcon>
              <CategoryIcon  className='sidebar-icons' />
            </ListItemIcon>
            <ListItemText primary="Category" className='sidebar-icons'/>
            {openCategoryCollapse ? <ExpandLess style={{ color: "#7d7c7c" }}/> : <ExpandMore style={{ color: "#7d7c7c" }}/>}
          </ListItem>

          <Collapse in={openCategoryCollapse} timeout="auto" unmountOnExit>

          <List component="div" disablePadding   className=' '>
          <Link to="/category">
                <ListItem style={isActive('/category')}>
                <ListItemIcon><LineWeightIcon className='sidebar-icons' /></ListItemIcon>
                  <ListItemText primary='See Categories' />
                </ListItem>
          </Link>

         <Link to="/category/add-category">
               <ListItem style={isActive('/category/add-category')}>
               <ListItemIcon><AddIcon  className='sidebar-icons' /></ListItemIcon>
                 <ListItemText primary='Add Category' />
               </ListItem>
         </Link>

          </List>
         </Collapse>

         <Link  to="/orders">
            <ListItem style={isActive('/orders')} className='mt-3'>
               <ListItemIcon><ShoppingBasketRoundedIcon className='sidebar-icons' /></ListItemIcon>
              <ListItemText primary="Orders" className='sidebar-icons'/>
            </ListItem>
          </Link>


         <Link  to="/manage">
            <ListItem style={isActive('/manage')} className='mt-3'>
               <ListItemIcon><LayersIcon className='sidebar-icons' /></ListItemIcon>
              <ListItemText primary="Manage" className='sidebar-icons'/>
            </ListItem>
          </Link>

         <Link  to="/users">
            <ListItem style={isActive('/users')} className='mt-3'>
               <ListItemIcon><PeopleAltIcon className='sidebar-icons' /></ListItemIcon>
              <ListItemText primary="Users" className='sidebar-icons'/>
            </ListItem>
          </Link>



          <Link  to="/activity">
             <ListItem style={isActive('/activity')} className='mt-3'>
                <ListItemIcon><LocalActivityIcon className='sidebar-icons' /></ListItemIcon>
               <ListItemText primary="Activity" className='sidebar-icons'/>
             </ListItem>
           </Link>


          <Link  to="/admin">
             <ListItem style={isActive('/admin')} className='mt-3'>
                <ListItemIcon><SettingsIcon className='sidebar-icons' /></ListItemIcon>
               <ListItemText primary="Settings" className='sidebar-icons'/>
             </ListItem>
           </Link>



          <Link to="/" style={{ color: "white" }}>
            <ListItem onClick={() => {
                  signout(() => {
                      history.push('/');
                  });
              }}>
               <ListItemIcon><ExitToAppIcon style={{ color: "#8c8f92"}}/></ListItemIcon>
              <ListItemText primary='Sign out' style={{ color: "#8c8f92"}}/>
            </ListItem>
          </Link>

        </List>
      </Drawer>

    </div>
  );
}

export default withRouter(MiniDrawer)
