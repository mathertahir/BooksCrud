

const express = require('express');
const router = express.Router();
const createBook = require('../controllers/create_book');
const getBooks = require('../controllers/get_book');
const updateBook = require('../controllers/update_book');
const deleteBook = require('../controllers/delete_book');

router.post('/create_book', createBook);
router.get('/get_book', getBooks);
router.put('/update_book/:id', updateBook);
router.delete('/delete_book/:id',deleteBook)


module.exports = router;
