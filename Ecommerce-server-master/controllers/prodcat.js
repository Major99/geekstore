const ProdCat = require('../models/prodcat');
const Product = require('../models/product');


exports.createProductByCategory = async (req, res) => {
    const { categories } = req.body
    const x = await ProdCat.find()
    if(x.length >=1){
      return res.status(200).json({
        message:"Already existed, please update existing one!"
      })
    }
    const newProdCat = ProdCat({
      prodcat: categories
    })
    await newProdCat.save((err,result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        result,
        message: "Successfully created"
      })
    })
};


exports.updateProductByCatgory = async (req,res) => {
  const { categories } = req.body
  const x = await ProdCat.find()
  const pdt = x[0]
  ProdCat.findByIdAndUpdate({_id: pdt._id}, {prodcat: categories}, (err,result) => {
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.status(200).json({
      message:"Successfully Updated"
    })
  })
}

exports.getProductByCategory = async (req,res) => {
    const categoryIDs = await ProdCat.find();
    if(categoryIDs.length == 0){
      return res.status(200).json({
        result: null
      })
    }
    const categoryIDArray = categoryIDs[0].prodcat;
    var data = [];
    var fuck;

  for(fuck = 0; fuck < categoryIDArray.length; fuck++){
    let _id = categoryIDArray[fuck]
    const product = await Product.find({ category: _id }).select('name price slug photoURL').sort({ createdAt: -1 }).limit(10)
    data.push(product)
    if(fuck + 1  == categoryIDArray.length){
      res.json(data)
      return;
    }
  }
}


exports.getPdtCat = async (req,res) => {
    const categoryIDs = await ProdCat.find()
    .populate('prodcat','name')
    .select('prodcat');
          return res.json(categoryIDs[0])
}
