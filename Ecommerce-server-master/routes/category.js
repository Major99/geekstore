const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/category");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { createCategoryValidator } = require('../validators/category');
const { runValidation } = require('../validators/index')


//CREATE CATEGORY ROUTE
router.post("/category/create", createCategoryValidator, runValidation,requireSignin, createCategory);

// PRODUCT BY ID ROUTE
router.get("/category/:categoryId", getCategoryById);

// DELETE CATEGORY BY ID ROUTE
router.delete("/category/delete/:categoryId",requireSignin,deleteCategory);

//UPDATE CATEGORY BY ID ROUTE
router.patch("/category/:categoryId",requireSignin, updateCategory);

//LIST OF CATEGORY ROUTE
router.get("/categories", getAllCategory);



module.exports = router;
