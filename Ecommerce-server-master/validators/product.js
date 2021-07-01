const { check } = require('express-validator');

module.exports.createProductValidator= [
       check('name')
       .not()
       .isEmpty()
       .withMessage('name is required'),

       check('photoURL')
       .not()
       .isEmpty()
       .withMessage('Product image is required'),

       check('description')
       .not()
       .isEmpty()
       .withMessage('description is required'),

       check('price')
       .not()
       .isEmpty()
       .withMessage('price is required'),

       check('category')
       .not()
       .isEmpty()
       .withMessage('category is required'),

       check('stock')
       .not()
       .isEmpty()
       .withMessage('stock is required'),

]
