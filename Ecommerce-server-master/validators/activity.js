const { check } = require('express-validator');

module.exports.createActivityValidator= [
        check('user')
        .not()
        .isEmpty()
        .withMessage('user is required'),

       check('message')
       .not()
       .isEmpty()
       .withMessage('message is required')



]
