
const Book = require('../models/books');
const asyncHandler = require('express-async-handler')

const updateBook =asyncHandler( async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      res.json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error.message);
      res.status(500).json({ error: 'Could not update book' });
    }
  })
  
  module.exports = updateBook;
  