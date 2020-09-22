const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');


// test route
router.get('/test' ,  users.test );


// register new user
router.post('/register' ,  users.register );

//get all users
router.get('/getall' ,  users.get_all );

//get single user by id
router.get('/get/:id' ,  users.get_single );

module.exports = router;