import React, { Fragment, useState, useEffect } from 'react';
import { productById } from '../../actions/product';
import moment from 'moment';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#212529",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const OrderCard  = ({ data }) => {
  
  const classes = useStyles();
 const [orderedItem, setOrderedItem] = useState();

  const product = async () => {
     const items = []
     for(var x =0; x<data.products.length; x++){
          const result = await productById(data.products[x].product)
                     items.push({ product: result.result, count: data.products[x].count})

     }
     setOrderedItem(items)
  }

  useEffect(() => {
   product()
  }, [])


 
 const showOrderedProduct = () => {
   return orderedItem && orderedItem.map((item, i) => {

      return(
                <StyledTableRow key={item.product.name}>
                  <StyledTableCell>{i+1}. {item.product.name}</StyledTableCell>
                  <StyledTableCell align="right">{item.count}</StyledTableCell>
                  <StyledTableCell align="right">₹{item.product.price}</StyledTableCell>
                  <StyledTableCell align="right">{item.product.price * item.count}</StyledTableCell>
                </StyledTableRow>);
   })
 }

  const payment = data.status ? "Paid" : "Failed";
  const payment_status= ()=>{
    if (payment== "Paid"){
    return <h6 style={{color:"green"}}>Payment Status - {payment}</h6>
    }else{
    return <h6 style={{color:"red"}}>Payment Status - {payment}</h6>
    }
  }

  return <Fragment>
            <div className="container-fluid row col justify-content-center">
              <div className="text-center card col-md-9">
              <p><b>Order Date</b> - {data && moment(data.createdAt).format('LLLL')}</p>
              <p><b>Order ID</b> - {data && data.order_id}</p>
                  <br />
                {data && data.status}
                  <Collapse defaultActiveKey={[]} onChange={callback}>
                    <Panel header="Order Summary" key="1">
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center" colSpan={3}>
                              <b>Details</b>
                              </StyledTableCell>
                              <StyledTableCell align="right"><b>Price</b></StyledTableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell><b>Desc</b></StyledTableCell>
                              <StyledTableCell align="right"><b>Qty.</b></StyledTableCell>
                              <StyledTableCell align="right"><b>Unit</b></StyledTableCell>
                              <StyledTableCell align="right"><b>Sum</b></StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {showOrderedProduct()}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Panel>
                  </Collapse>
                  <br />
                {payment_status()}
              <br/>
              </div>
            </div>
         </Fragment>
}

export default OrderCard;
