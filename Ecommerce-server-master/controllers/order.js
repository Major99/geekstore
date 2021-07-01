const Order = require('../models/order')
const Cart = require('../models/cart')
const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const User = require('../models/user');

var instance = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
 key_secret: process.env.RAZORPAY_KEY_SECRET
});

//CREATE ORDER
exports.createOrder =  async (req, res) => {
   const { products, order_amount, userId } = req.body

   // console.log(products)



   const newOrder = Order({
     userId,
     products,
     order_amount
   })

  await newOrder.save((err, result) => {
     if(err){
       return res.status(400).json({
         message: "Failed to save an order in the database"
       })
     }

     var options = {
      amount: order_amount*100,
      currency: "INR",
      receipt: uuidv4(),
      payment_capture: '1'
      };

     instance.orders.create(options, function(err, order) {
   if(err){
     return res.status(400).json({
       error: "Failed to create order"
     })
   }
   Order.findByIdAndUpdate(result._id,{order_id: order.id}, { new: true })
         .exec((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }

       products.map(async (item) => {
          await Cart.deleteMany({product: item.product, user: userId})
        })

        return res.status(200).json({
         order_id: order.id,
         res: "ok",
         message: "Order created successfully"
        })
   });
 })
})
}


// VERIFICATION
 module.exports.paymentVerification =  async (req,res) => {
   const {payment_id, order_id, razorpay_signature, userId} = req.body;
   console.log(req.body)
var generatedSignature = crypto
                        .createHmac("SHA256",process.env.RAZORPAY_KEY_SECRET)
                        .update(order_id + "|" + payment_id)
                        .digest("hex");

 var isSignatureValid = generatedSignature == razorpay_signature;

 if(isSignatureValid){
   Order.findOneAndUpdate({ order_id: order_id }, {payment_id: payment_id, status: true },{ new: true }).exec((err, result) => {
     if(err){
       return res.status(400).json({
         error: err,
       })
     }
     return res.status(200).json({
       status: "successful payment",
       payment: 1
     })
   })
 } else{
   return res.status(400).json({
     status: "payment failed",
     payment: 0
   })
 }
}


// ALL ORDER OF A USER BY ID
 module.exports.allOrdersOfUser = (req, res) => {
    const userId = req.params.user_id
    Order.find({ userId: userId })
    .sort({ createdAt: -1 })
      .exec((err, result) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          result
        })
      })
 }

 // ALL PAID ORDERS
  module.exports.allOrders = (req, res) => {
     const userId = req.params.user_id
     Order.find({ status: true })
     .sort({ createdAt: 1 })
       .exec((err, result) => {
         if(err){
           return res.status(400).json({
             error: err
           })
         }
         res.status(200).json({
           result
         })
       })
  }
