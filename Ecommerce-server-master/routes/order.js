const express = require("express");
const router = express.Router();

const {
  createOrder,
  paymentVerification,
  allOrdersOfUser,
  allOrders
} = require("../controllers/order");

const { requireSignin, adminMiddleware } = require("../controllers/auth");
//CREATE ORDER ROUTE
router.post('/order/create',requireSignin, createOrder);
router.post('/order/verify',requireSignin, paymentVerification)
router.get('/order/all-orders',allOrders)
router.get('/order/user/:user_id', allOrdersOfUser)
module.exports = router;
