const express = require('express');
const router = express.Router();

const  { createGenre , genreById , getGenre ,updateGenre , deleteGenre , genreList } = require ('../controllers/genre');
const {isAdmin} = require('../middleware/auth');

router.get('/list', genreList);
router.get('/:genreId', getGenre);
router.post('/create', isAdmin, createGenre);
router.delete('/delete/:genreId',isAdmin, deleteGenre);




router.param('genreId',genreById);
module.exports = router;