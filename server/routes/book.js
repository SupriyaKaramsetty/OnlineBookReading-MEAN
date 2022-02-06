const express = require('express');
const router = express.Router();
const {isAuth,isAdmin} = require('../middleware/auth');
const {getBook,bookById,createBook,deleteBook,getAllBooks,updateBook,relatedBooks, 
    addToWantToReadBooks,
    addToCurrentlyReadingBooks,
    addToReadBooks,
    getWantToReadBooks,
    getCurrentlyReadingBooks,
    getReadBooks,
    getLibraryBooks
} = require("../controllers/book");

//book routes
router.get('/list', getAllBooks);
router.get('/relatedBooks/:bookId',relatedBooks);
router.get('/my-library',isAuth, getLibraryBooks);
router.get('/my-library/getWantToRead',isAuth,getWantToReadBooks);
router.get('/my-library/getCurrentlyReading',isAuth,getCurrentlyReadingBooks);
router.get('/my-library/getRead',isAuth,getReadBooks);
router.get('/detail/:bookId', getBook);
router.get('/:bookId', getBook);
router.post('/create', isAdmin, createBook)
router.patch('/update/:bookId',isAdmin, updateBook);
router.delete('/delete/:bookId',isAdmin, deleteBook);
router.post('/my-library/wantToRead/:bookid',isAuth,addToWantToReadBooks);
router.post('/my-library/currentlyReading/:bookid',isAuth, addToCurrentlyReadingBooks);
router.post('/my-library/read/:bookid',isAuth, addToReadBooks);

router.param('bookId',bookById);
module.exports = router;