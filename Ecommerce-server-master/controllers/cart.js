const Cart =  require('../models/cart');


//CREATE CATEGORY
exports.addIntoCart = async (req, res) => {
  const { product, name, count, price, user } = req.body
  const x = await Cart.find({ user: user, product: product })

if(x.length==0){

  const productCart = new Cart({
          product,
          name,
          count,
          user,
          price
  })

  return productCart.save((err, result) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
       res.status(200).json({
          result,
          res: "ok",
          message: `Added into cart`
       })
     })
}
return res.status(200).json({
  res:"",
  message: `Already added into cart`
})
};

// REMOVE FROM THE CART
exports.removeFromCart = (req, res) => {
  const _id = req.params.cartProductId
   Cart.findOneAndRemove({ _id }).exec((err, data) => {
       if (err) {
           return res.json({
               error: "Failed to remove from cart"
           });
       }
       res.json({
           message: 'successfully removed from the cart'
       });
   });
};


// GET PRODUCT FROM THE CART
exports.getFromCart = (req, res) => {
  const _id = req.params.userId
  Cart.find({ user: _id }).exec((err,result) => {
    if(err){
      return res.status(400).json({
        result
      })
    }
    res.status(200).json({
      result
    })
  })
};


exports.addProductCountCart = (req, res) => {
  const cart_id = req.params.cartProductId;
  const product_id = req.params.productId;


   Cart.findByIdAndUpdate({_id: cart_id, product: product_id },{ $inc: { count: 1 } }, {new: true }).exec((err, data) => {
       if (err) {
           return res.json({
               error:  err
           });
       }
       res.json({
           data,
           message: 'successfully incremented into cart'
       });
   });
};



exports.subtractProductCountCart = (req, res) => {
  const cart_id = req.params.cartProductId;
  const product_id = req.params.productId;

  Cart.findByIdAndUpdate({_id: cart_id, product: product_id },{ $inc: { count: -1 } }, {new: true }).exec((err, data) => {
      if (err) {
          return res.json({
              error:  err
          });
      }
      res.json({
          data,
          message: 'successfully decremented into cart'
      });
  });
};
