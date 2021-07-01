import React, { useState, useEffect } from 'react';
import Layout from '../../core/layout';
import { List,Divider, Button } from 'antd';
import { getCategoryById, singleCategory,updateCategoryById } from '../../../actions/category'
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
import { createActivity } from '../../../actions/activity'
import { isAuth,getCookie } from '../auth/helpers';




const UpdateCategory = ({ match }) => {


  const [name, setName] =  useState();
  const token = getCookie('token')

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


const classes = useStyles();




  const getCategoryById = (id) => {
    singleCategory(id)
    .then( response => {
      if(response.error){
        return toast.error(response.error)
      }
      setName(response.result.name)


    })
    .catch( err => {
      console.log(err.error)
      toast.error(err.error)
    })
  }


  const updateCategory = (e) => {
    e.preventDefault()

    const updatedCategoryActivity = {
      user: isAuth()._id,
      message: `${isAuth().name} has updated a category - ${name}`
    }
    const updatedInfo = { name:name }

    updateCategoryById(updatedInfo,match.params.categoryId,token)
    .then( response => {
      if(response.error){
        return toast.error(response.error)
      }
      createActivity(updatedCategoryActivity,token)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      toast.success(response.message)
    })
    .catch( err => {
      console.log(err.error)
      toast.error(err.error)
    })
  }

useEffect(() => {
  getCategoryById(match.params.categoryId)
},[])






  return <React.Fragment>
      <ToastContainer />
          <Layout>
          <div className='container'>
              <Divider orientation="left"><h1>Update Category</h1></Divider>


              <form className={classes.root} noValidate autoComplete="off">
                 <TextField
                   id="outlined-secondary"
                   variant="outlined"
                   color="primary"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   fullWidth={true}
                 />
              <button  onClick={updateCategory}  className="btn btn-primary">UPDATE CATEGORY</button>
            </form >


          </div>
          </Layout>
       </React.Fragment>
}

export default UpdateCategory;
