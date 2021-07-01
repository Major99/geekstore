const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
   userId: {
     type: ObjectId,
     ref:"User"
   },
   products: [{
        product: {
          type: ObjectId,
          ref:'Product',
          required:true
        },
        count: {
          type: Number,
          default: 1
        },
        price:{
          type: Number,
          required:true
        }
   }],
   order_amount: {
     type: Number,
     required:true
   },
   status: {
     type: Boolean,
     default: false
   },
   order_id: {
     type: String,
     default: null
   },
   payment_id: {
     type: String,
     default: null
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
