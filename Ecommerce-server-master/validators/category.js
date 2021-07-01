const { check } = require('express-validator');

module.exports.createCategoryValidator= [
       check('name')
       .not()
       .isEmpty()
       .withMessage('name is required'),

]
