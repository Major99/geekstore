import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../../core/layout';
import { List,Divider, Button } from 'antd';
import { addProduct } from '../../../actions/product'
import { getCategory } from '../../../actions/category'
import './add-product.css'
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createActivity } from '../../../actions/activity'
import { isAuth ,getCookie} from '../auth/helpers';
import {DropzoneArea} from 'material-ui-dropzone'
import axios from 'axios';

import TextEditor from './editor'



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


const Product = () => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setimageUrl] =  useState();
  const [name, setName] =  useState();
  const [description, setDescription] =  useState();
  const [price, setPrice] =  useState();
  const [stock, setStock] =  useState();
  const [categories, setCategories] =  useState();
  const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [file, setFile] = useState([]);
  const [uploadStatus, setUploadStatus] = useState();
  const [uploaded, setUploaded] = useState();


  const token = getCookie('token')

  const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },

    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  margin: theme.spacing(1),
  },
}));


const classes = useStyles();

const createProduct = (e) => {

  const createdProductActivity = {
    user: isAuth()._id,
    message: `${isAuth().name} has created a product - ${name}`
  }
  e.preventDefault()
  const  body = {
        photoURL: imageUrl,
        name: name,
        description: description,
        price: price,
        category: selectedValue,
        stock: stock
  };


  addProduct(body,token)
  .then( response => {
    if(response.error){
      return toast.error(response.error)
    }
    createActivity(createdProductActivity,token)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    toast.success(`${name} is successfully created`)
  })
  .catch( err => {
    console.log(err.error)
    toast.error(err.error)
  })
}



const ImageUpload = (e) => {
setLoading(true)
if(file.length ==0){
  toast.error('Please Choose file')
}
var imageData = new FormData();
imageData.append('upload_preset','zjhyapj2')
imageData.append('file',file);
axios.post(`${process.env.REACT_APP_API}/upload`,imageData)
.then(res => {
  setUploadStatus(true)
  setLoading(false)
  setUploaded(true)
  setimageUrl(res.data.data[0].url)
})
.catch((error) => {
  console.log(error)
})}




  useEffect(() => {
    loadCategories()
  },[])


  const loadCategories = () => {
       getCategory()
       .then( result => {
         if(result.error){
           return console.log(result.error)
         }
         setCategories(result)
       })
  }

  const onImageSelect = (files) => {
   setFile(files[0]);
}

  const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );


  return <Fragment>
    <ToastContainer />
          <Layout>

             <div className='container'>
                <Divider orientation="left"><h1>Add Product</h1></Divider>

                <div className='row justify-content-center col'></div>
                <form className={classes.root} noValidate autoComplete="off">

                <small className="text-muted">Product Image
                <DropzoneArea
                           dropzoneText='Drag and drop an image here or click'
                           acceptedFiles={['image/*']}
                           onChange={onImageSelect}
                            className=''
                           />
                 <Button onClick={ImageUpload} className="mb-2" block>Upload Image</Button>
                 {loading && <small style={{ color: "red", fontWeight:"bold" }}>Uploading .... </small>}
                 {uploaded && <small style={{ color: "green", fontWeight:"bold" }}>Uploaded</small>}
                </small>

                   <TextField
                     id="outlined-secondary"
                     label="Name"
                     variant="outlined"
                     color="primary"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     fullWidth={true}
                   />

                  <br />
                  <TextEditor  onChange={(text) => setDescription(text)} />
                   <br />

                  <FormControl className={classes.margin} variant="outlined" fullWidth={true}>
                    <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      type="Number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                      labelWidth={60}
                    />
                  </FormControl>

                   <br />

                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Stock</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      type="Number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      labelWidth={60}

                    />
                  </FormControl>

                     <br />

                  <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
                  <Autocomplete
                  onChange={(event, newValue) => {
                    if(newValue){
                        setSelectedValue(newValue._id)
                    }
                  }}
                  options={categories || 'Empty'}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                   <TextField
                     {...params}
                     className="category-input"
                     variant="outlined"
                     label="Category"
                     placeholder="Select categories"
                   />
                  )}
                  />
                </FormControl>
                <button onClick={createProduct}  className="btn btn-primary">CREATE PRODUCT</button>
              </form >
             </div>
          </Layout>
       </Fragment>
}

export default Product;
