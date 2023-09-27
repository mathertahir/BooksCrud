
const asyncHandler = require('express-async-handler')
const Book = require('../models/books');

const createBook = asyncHandler( async (req, res) => {

    const { title, author,no_of_pages,published_at  } = req.body
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);

  } catch (error) {
    console.error('Error creating book:', error.message);
    res.status(500).json({ error: 'Could not create book' });
  }
})

module.exports = createBook;