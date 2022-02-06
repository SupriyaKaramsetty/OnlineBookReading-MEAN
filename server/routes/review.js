const express = require('express');
const router = express.Router();

const {verifyToken,isAuth} = require('../middleware/auth');
const {addReview,deleteReview,getReviews} = require('../controllers/review');

router.get('/:bookId',getReviews);
router.post('/add/:bookId',isAuth,addReview);
router.delete('/delete/:reviewId', isAuth, deleteReview);
module.exports = router;