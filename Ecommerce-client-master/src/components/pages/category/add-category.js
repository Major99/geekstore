import React, { useState } from 'react';
import Layout from '../../core/layout';
import { List,Divider, Button } from 'antd';
import { addCategory } from '../../../actions/category'
import { createActivity } from '../../../actions/activity'
import { isAuth,getCookie } from '../auth/helpers';

import './add-category.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
root: {
  '& > *': {
    margin: theme.spacing(1),
    width: '25ch',
  },

  formControl: {
  margin: theme.spacing(1),
  minWidth: 120,
},
margin: theme.spacing(1),
},
}));









const AddCategory = () => {
  const classes = useStyles();
  const [name, setName] =  useState();
  const token = getCookie('token')

  const createCategory = (e) => {
    e.preventDefault()
    const  body = { name: name };
    const createCategoryActivity = {
      user: isAuth()._id,
      message: `${isAuth().name} has created a category - ${name}`
    }
    addCategory(body,token)
    .then( response => {
      if(response.error){
        return toast.error(response.error)
      }
      createActivity(createCategoryActivity,token)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      toast.success(`${name} is successfully created`)

    })
    .catch( err => {
      console.log(err.error)
      toast.error(err.error)
    })
  }



  return <React.Fragment>
    <ToastContainer />
          <Layout>

             <div className='container'>
                <Divider orientation="left"><h1>Add Category</h1></Divider>
                <form className={classes.root} noValidate autoComplete="off">
                  <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
                   <TextField
                     id="outlined-secondary"
                     label="Name"
                     variant="outlined"
                     color="primary"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     fullWidth={true}
                   />
                   </FormControl>
                <button   onClick={createCategory} className="btn btn-primary">CREATE CATEGORY</button>
              </form >
             </div>
          </Layout>
       </React.Fragment>
}

export default AddCategory;
