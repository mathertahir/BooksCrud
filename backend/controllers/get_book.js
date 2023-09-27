

const Book = require('../models/books');
const asyncHandler = require('express-async-handler')

const getBooks =  asyncHandler(   async (req, res) => {

    const { title, author,no_of_pages,published_at  } = req.body
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error getting books:', error.message);
    res.status(500).json({ error: 'Could not get books' });
  }
})

module.exports = getBooks;

