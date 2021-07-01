import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../../core/layout';
import { List,Divider, Button } from 'antd';
import { singleProduct,updateProductById } from '../../../actions/product'
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
import { createActivity } from '../../../actions/activity'
import { isAuth,getCookie } from '../auth/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
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



const Product = ({ match }) => {

  const [loading, setLoading] = useState(false);
  const [imageUrl, setimageUrl] =  useState();
  const [name, setName] =  useState();
  const [description, setDescription] =  useState();
  const [price, setPrice] =  useState();
  const [stock, setStock] =  useState();
  const [category, setCategory] =  useState();
  const [categories, setCategories] = useState();
  const [bestseller, setBestseller] = useState(false)
  const token = getCookie('token')

  const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },

    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  margin: theme.spacing(1),
  },
}));


const classes = useStyles();

const loadCategories = () => {
     getCategory()
     .then( result => {
       if(result.error){
        console.log(result.error)
       }
       setCategories(result)
     })
}

  const getProductById = (id) => {
    singleProduct(id)
    .then( response => {
      if(response.error){
        return toast.error(response.error)
      }
      setBestseller(response.result.bestseller)
      setName(response.result.name)
      setDescription(response.result.description)
      setCategory(response.result.category)
      setPrice(response.result.price)
      setStock(response.result.stock)

    })
    .catch( err => {
      console.log(err.error)
      toast.error(err.error)
    })
  }


  const updateProduct = (e) => {

    const updatedProductActivity = {
      user: isAuth()._id,
      message: `${isAuth().name} has updated a product - ${name}`
    }

    e.preventDefault()

    const updatedInfo = {
      name:name,
      description: description,
      price:price,
      bestseller: bestseller,
      category: category,
      stock: stock
    }

    updateProductById(updatedInfo,match.params.productId,token)
    .then( response => {
      if(response.error){
        return toast.error(response.error)
      }
      createActivity(updatedProductActivity,token)
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
  getProductById(match.params.productId)
  loadCategories()
},[])


const handleUpload = info => {
    if (info.file.status === 'uploading') {
       setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setimageUrl(imageUrl);
        setLoading(false);
      }
      );
    }
  };
console.log(description)
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
              <Divider orientation="left"><h1>Update Products</h1></Divider>

              <form className={classes.root} noValidate autoComplete="off">
              <small className="text-muted">Product Image
              <Upload
                     name="avatar"
                     listType="picture-card"
                     className="avatar-uploader ml-2"
                     showUploadList={false}
                     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                     beforeUpload={beforeUpload}
                     onChange={handleUpload}
                   >
                     {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                   </Upload>
              </small>

               <span>
                Best Seller
               </span>
               <Switch
                 checked={bestseller}
                 onChange={(e, value) => setBestseller(value)}
                 color="primary"
                 name="Bestseller"
                 inputProps={{ 'aria-label': 'primary checkbox' }}
                />


              <br />

                 <TextField
                   placeholder="Name"
                   variant="outlined"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   fullWidth={true}
                 />

                <br />
              { description && <TextEditor  onChange={(text) => setDescription(text)} data={description}/>}
                 <br />

                <FormControl className={classes.margin} variant="outlined" fullWidth={true}>
                  <OutlinedInput
                    type="Number"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    labelWidth={60}
                  />
                </FormControl>

                 <br />

                <FormControl fullWidth className={classes.margin} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="Number"
                    placeholder="Number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    labelWidth={60}

                  />
                </FormControl>

                   <br />

              <span>
                <small>Category  : {category && category.name} </small>
              </span>

                <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
                   <Autocomplete
                   onChange={(event, newValue) => {
                     if(newValue){
                         setCategory(newValue._id)
                     }
                   }}
                   options={categories}
                   getOptionLabel={(option) => option.name}
                   renderInput={(params) => (
                    <TextField
                      {...params}

                      className="category-input"
                      variant="outlined"
                      placeholder="Change Category"
                    />
                   )}
                   />
              </FormControl>
              <button  onClick={updateProduct}  className="btn btn-primary">UPDATE PRODUCT</button>
            </form >


          </div>
          </Layout>
       </Fragment>
}

export default Product;
