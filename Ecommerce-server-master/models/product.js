const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    bestseller:{
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    slug: {
          type: String,
          unique: true,
          index: true
      },
    mtitle: {
        type: String
    },
    mdesc: {
        type: String
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photoURL: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
