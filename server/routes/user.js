const express = require('express');
const router = express.Router();


const { signup, login,getAllUsers,getSingleUser } = require('../controllers/user');
const {isAdmin} = require('../middleware/auth');
router.post('/signup', signup);
router.post('/login', login);
router.get('/list',isAdmin, getAllUsers);
router.get('/singleUser',isAdmin, getSingleUser)


module.exports = router;