const express = require('express');
const router = express.Router();
const verifyUserToken = require('../middleware/AuthMiddleware');

const OrderController = require('../controller/OrderController');

router.post('/create-order',verifyUserToken,OrderController.create);

router.put('/update-order',verifyUserToken,OrderController.updateById);
router.delete('/delete-order',verifyUserToken,OrderController.deleteById);
router.get('/find-order/:id',verifyUserToken,OrderController.findById);
router.get('/find-all-order',verifyUserToken,OrderController.findAll);
router.get('/find-order-count',verifyUserToken,OrderController.findAllCount);
router.get('/find-all-income',verifyUserToken,OrderController.findAllIncome);


module.exports= router