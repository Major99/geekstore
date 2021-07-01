
const express = require('express');
const router = express.Router();

//import controllers
const { uploadFile } = require('../controllers/upload');

//import middleware
const uploadMiddleware = require('../middleware/upload');

router.post('/upload',uploadMiddleware.array('file'), uploadFile);

module.exports = router;
