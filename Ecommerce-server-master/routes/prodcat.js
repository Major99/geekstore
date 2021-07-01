const express = require("express");
const router = express.Router();

const {
  createProductByCategory,
  updateProductByCatgory,
  getProductByCategory,
  getPdtCat
} = require("../controllers/prodcat");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

router.post('/create-prod-by-cat',requireSignin, createProductByCategory);
router.put('/update-prod-by-cat',requireSignin,updateProductByCatgory);
router.get('/get-prod-by-cat', getProductByCategory);
router.get('/getPdtCat',   getPdtCat);

module.exports = router;
