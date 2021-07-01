import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getproductByName, deleteProductById } from '../../../actions/product'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { Link } from 'react-router-dom';
import {  Button } from 'antd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import moment from 'moment'
const Search = ({ term, data })  => {
const searchData = data ? data : [{name: ''}];
const [product, setProduct] = useState();
const [open, setOpen] = useState(false);
const [deleteID, setDeleteID] = useState(null);



const getProduct = (pdt) => {
  getproductByName(pdt)
  .then( response => {
    if(response.error){
      return console.log(response.error)
    }
     console.log(response)
     setProduct(response.result)
  })
  .catch( err => {
    console.log(err.error)
  })
}

const deleteProduct = () => {
  deleteProductById(deleteID)
  .then( result => console.log(result))
  .catch(err => console.log(err))
  window.location.reload(true);
}


const handleClickOpen = (id) => {
  setOpen(true);
  setDeleteID(id)
};

const handleClose = () => {
  setOpen(false);
};

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const showProduct = () => {
return  product && product.map( (item,i)=> {
    return <Tr key={i}>
                <Td></Td>
                <Td>{item.name}</Td>
                <Td>{item.category.name}</Td>
                <Td>{item.description}</Td>
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

  return (
    <div className='mb-3'>
      <Autocomplete
        id="free-solo-2-demo"
        filterSelectedOptions={true}
        onInputChange={(event, newInputValue) => {
                 getProduct(newInputValue)
                }}
        options={searchData.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search product"
            margin="normal"
            onChange={(e) => term(e.target.value)}
            variant="outlined"
            InputProps={{ ...params.InputProps, type: [] }}
          />
        )}
      />

    { product && <div className='mb-5' style={{ backgroundColor: "#f5f5f5"}}>
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
       {showProduct()}
    </Tbody>
</Table>
</div>
}
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
  );
}




export default Search;
