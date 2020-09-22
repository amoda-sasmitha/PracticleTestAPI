const express = require('express');
const router = express.Router();
const transactions = require('../controllers/transactions.controller');


// test route
router.get('/test' ,  transactions.test );

// create new transactions
router.post('/create' ,  transactions.create );

//get all transaction by mobile phone
router.get('/getall/:mobile' ,  transactions.getall_transactions );

//get all coming in transaction by mobile phone
router.get('/getall/in/:mobile' ,  transactions.get_in_transactions );

//get all coming out transaction by mobile phone
router.get('/getall/out/:mobile' ,  transactions.get_out_transactions );

module.exports = router;