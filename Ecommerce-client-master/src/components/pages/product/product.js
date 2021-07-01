import React, {Fragment, useState, useEffect } from 'react';
import Layout from '../../core/layout';
import {Divider, Button } from 'antd';
// import ViewListIcon from '@material-ui/icons/ViewList';
// import AddIcon from '@material-ui/icons/Add';
import {  deleteProductById, getProductByFilter, searchProduct } from '../../../actions/product'
import { getCategory } from '../../../actions/category'
import './product.css'
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { ToastContainer, toast } from 'react-toastify' ;
// import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { createActivity } from '../../../actions/activity'
import { isAuth,getCookie } from '../auth/helpers';
import moment from 'moment'
import renderHTML from 'react-render-html';


import SearchProduct from './search-product'







function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}



const marks = [
  {
    value: 0,
    label: '₹0',
  },

  {
    value: 500,
    label: 'Min ₹500',
  },

  {
    value: 1000,
    label: 'Min ₹1000',
  },
];


const Product = () => {
const [categories, setCategories] = useState();
const [value, setValue] = useState();
const [selectedValue, setSelectedValue] = useState();
const [priceValue, setPriceValue] = useState(0);
const [searchedProduct, setSearchedProduct] = useState();
const [products, setProducts] = useState();
const [open, setOpen] = useState(false);
const [deleteID, setDeleteID] = useState(null);
const token = getCookie('token')

const loadCategories = () => {
     getCategory()
     .then( result => {
       if(result.error){
         return console.log(result.error)
       }
       setCategories(result)
     })
}

const handleClickOpen = (id) => {
  setOpen(true);
  setDeleteID(id)
};

const handleClose = () => {
  setOpen(false);
};

const deleteProduct = () => {
  const deletedProductActivity = {
    user: isAuth()._id,
    message: `${isAuth().name} has deleted a product - ${deleteID}`
  }

  deleteProductById(deleteID,token)
  .then( result => {
    createActivity(deletedProductActivity,token)
      .then(res => {window.location.reload(true)})
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}



const productByFilter = () => {
  getProductByFilter(`price=${priceValue}`)
  .then( response => {
    if(response.error){
      return toast.error(response.error)
    }
    setProducts(response.result)

  })
  .catch( err => {
    console.log(err.error)
    toast.error(err.error)
  })
}

const getProductBySearch = (body) => {
  searchProduct(body)
  .then( response => {
    if(response.error){
      return toast.error(response.error)
    }
    setSearchedProduct(response)
  })
  .catch( err => {
    console.log(err.error)
    toast.error(err.error)
  })
}




useEffect(() => {
  productByFilter(100)
  loadCategories()
},[])


const showProducts = () => {
    return  products && products.map( (item,i)=> {
      return <Tr key={i}>
                <Td> </Td>
                <Td>{item.name}</Td>
                <Td>{item.category.name}</Td>
                <Td>{renderHTML(item.description)}</Td>
                <Td>{item.stock}</Td>
                <Td>{item.sold}</Td>
                <Td>₹{item.price}</Td>
                <Td>{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Td>
                <Link to={`/product/edit-product/${item._id}`}>
                  <Button type="primary"   className='edit-btn'>
                     Update
                  </Button>
                </Link>
                <Button    type="primary" onClick={handleClickOpen.bind(this, item._id)}  danger className='edit-btn'>
                   Delete
                </Button>
              </Tr>
  })
}


return <Fragment>
          <Layout>
             <div className='container text-center'>
                 <Divider orientation="left"><h1>Products</h1></Divider>
                <SearchProduct  term={getProductBySearch} data={searchedProduct} />
                 <div className='pl-5 pr-5 mb-4 card pb-3 pt-3'>
                      <Slider
                        defaultValue={100}
                        onChange={(event, value) =>  {
                          setPriceValue(value)
                          productByFilter()
                        }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        marks={marks}
                        min={0}
                        max={1000}
                      />

                 <Autocomplete
                     multiple
                      onChange={(event, newValue) => {
                        const cat = newValue.map(id => {
                          return id._id
                        })
                         setSelectedValue(cat)
                      }}

                      onInputChange={(event, newInputValue) => {
                        console.log(newInputValue)
                      }}
                     id="tags-standard"
                     options={categories || 'Empty'}
                     getOptionLabel={(option) => option.name}
                     renderInput={(params) => (
                       <TextField
                         {...params}
                         variant="outlined"
                         label="Category"
                         placeholder="Select category"
                       />
                     )}
                 />
                  </div>

                 <Table>
               <Thead>
                 <Tr>
                   <Th>Image</Th>
                   <Th>Name</Th>
                   <Th>Category</Th>
                   <Th>Description</Th>
                   <Th>Stock</Th>
                   <Th>Sold</Th>
                   <Th>Price</Th>
                   <Th>Created at</Th>
                   <Th></Th>
                 </Tr>
               </Thead>
               <Tbody>
                  {showProducts()}
               </Tbody>
           </Table>

           <div>
                 <Dialog
                   open={open}
                   onClose={handleClose}
                   PaperComponent={PaperComponent}
                   aria-labelledby="draggable-dialog-title"
                 >
                   <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                     Delete
                   </DialogTitle>
                   <DialogContent>
                     <DialogContentText>
                       Are you sure want to delete this product ?
                     </DialogContentText>
                   </DialogContent>
                   <DialogActions>
                     <Button autoFocus onClick={handleClose} type="primary" primary>
                       Cancel
                     </Button>
                     <Button onClick={deleteProduct} type="primary" danger>
                       Delete
                     </Button>
                   </DialogActions>
                 </Dialog>
               </div>

             </div>
          </Layout>
       </Fragment>
}

export default Product;
