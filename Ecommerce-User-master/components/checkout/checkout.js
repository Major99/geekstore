import React, { Fragment} from 'react';

import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const DELIVERY_CHARGE = 27;

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

const Checkout = ({ pay, product }) => {
  
  const classes = useStyles();
  const showCheckout = () => {
    return product && product.map((item, i) => {
      // return  <div className="m-1" key={i}>
      //             <div className="checkout-card-text-1">
      //                 {i+1}.{item.name}
      //             </div>
      //             <div className="checkout-card-text-2">
      //               {item.count}Qty X ₹{item.price}
      //             </div>
      //         </div>
              
          return  <StyledTableRow key={item.name}>
                    <StyledTableCell>{i+1}. {item.name}</StyledTableCell>
                    <StyledTableCell align="right">{item.count}</StyledTableCell>
                    <StyledTableCell align="right">₹{item.price}</StyledTableCell>
                    <StyledTableCell align="right">₹{item.price*item.count}</StyledTableCell>
                  </StyledTableRow>

    })
  }

  return <Fragment>
          <h1 className="cartpage-title pt-3">Checkout</h1>
            <div className="row justify-content-center p-3">
                <div className="card checkoutpage-card-container col-md-7 col-sm-5">
                 {/* {showCheckout()} */}
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center" colSpan={3}>
                            Details
                          </StyledTableCell>
                          <StyledTableCell align="right">Price</StyledTableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>Desc</StyledTableCell>
                          <StyledTableCell align="right">Qty.</StyledTableCell>
                          <StyledTableCell align="right">Unit</StyledTableCell>
                          <StyledTableCell align="right">Sum</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {showCheckout()}
                        <StyledTableRow>
                          <StyledTableCell rowSpan={3} />
                          <StyledTableCell colSpan={2}>Subtotal</StyledTableCell>
                          <StyledTableCell align="right">₹{pay}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell>Delivery Charges</StyledTableCell>
                          <StyledTableCell align="right"> </StyledTableCell>
                          <StyledTableCell align="right">₹{DELIVERY_CHARGE}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell colSpan={2}>Total</StyledTableCell>
                          <StyledTableCell align="right">₹{pay + DELIVERY_CHARGE}</StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                 <hr />
                 <div className="checkoutpage-card-text-3">
                   Total Amount: ₹{pay}
                 </div>
                </div>
           </div>
         </Fragment>
}

export default Checkout;
