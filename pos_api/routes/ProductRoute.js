const express = require('express');
const router = express.Router();
const verifyUserToken = require('../middleware/AuthMiddleware');

const ProductController = require('../controller/ProductController');

router.post('/create-product',verifyUserToken,ProductController.create);

router.put('/update-product/:id',verifyUserToken,ProductController.updateById);
router.delete('/delete-product/:id',verifyUserToken,ProductController.deleteById);

router.get('/find-product/:id',verifyUserToken,ProductController.findById);

router.get('/find-all-product',verifyUserToken,ProductController.findAll);

router.get('/find-product-min',verifyUserToken,ProductController.findMinPro);
router.get('/find-product-count',verifyUserToken,ProductController.findAllCounts);


module.exports= router