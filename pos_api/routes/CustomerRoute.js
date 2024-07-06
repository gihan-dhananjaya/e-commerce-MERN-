const express = require('express');
const router = express.Router();
const verifyUserToken = require('../middleware/AuthMiddleware');

const CustomerController = require('../controller/Customercontroller');

router.post('/create-customer',verifyUserToken,CustomerController.create);

router.put('/update-customer/:id',verifyUserToken,CustomerController.updateById);

router.delete('/delete-customer/:id',verifyUserToken,CustomerController.deleteById);

router.get('/find-customer/:id',verifyUserToken,CustomerController.findById);

router.get('/find-all-customer',verifyUserToken,CustomerController.findAll);

router.get('/find-customer-count',verifyUserToken,CustomerController.findCustomerCount);

module.exports= router