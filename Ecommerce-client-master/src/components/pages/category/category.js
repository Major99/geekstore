import React, { useState, useEffect } from 'react';
import Layout from '../../core/layout';
import { List,Divider, Button } from 'antd';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddIcon from '@material-ui/icons/Add';
import { getCategory,deleteCategoryById } from '../../../actions/category'
import { createActivity } from '../../../actions/activity'
import { isAuth,getCookie} from '../auth/helpers';
import './category.css'
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Category = () => {

  const [categories, setCategories] = useState();
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
    const deletedCategoryActivity = {
      user: isAuth()._id,
      message: `${isAuth().name} has deleted a category to- ${deleteID}`
    }
    deleteCategoryById(deleteID,token)
    .then( result => {
      createActivity(deletedCategoryActivity,token)
        .then(res => {window.location.reload(true)})
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }



useEffect(() => {
  loadCategories()
},[])


  const showCategories = () => {
  return  categories && categories.map( item => {

      return <Tr>
                  <Td>{item.name}</Td>
                  <Td>{moment(item.createdAt).format('LLLL')}</Td>
                  <Link to={`/category/edit-category/${item._id}`}><Button type="primary" primary className='edit-btn'>Update</Button></Link>
                  <Button  type="primary" danger onClick={handleClickOpen.bind(this, item._id)}  className='edit-btn'>
                    Delete
                  </Button>
                </Tr>
    })
  }

  return <React.Fragment>
          <Layout>
             <div className='container text-center'>
                 <Divider orientation="left"><h1>Categories</h1></Divider>

                 <Table>
               <Thead>
                 <Tr>
                   <Th>Name</Th>
                   <Th>Created at</Th>
                   <Th></Th>
                 </Tr>
               </Thead>
               <Tbody>
                  {showCategories()}
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
                       Are you sure want to delete this category ?
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
       </React.Fragment>
}

export default Category;
