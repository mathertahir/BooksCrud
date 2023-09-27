const asyncHandler = require('express-async-handler')
const  books=require('../models/books')

const deleteBook = asyncHandler(async (req, res) => {
   

    const find_book = await books.findById(req.params.id)
  


    if (!find_book) {
        res.status(400)
        throw new Error('your book is not found')

    }
    try {
       
        const result = await books.findByIdAndRemove(req.params.id)
        res.status(200)
        res.json(result)
    } catch (error) {
        res.status(400)
        throw new Error(error)

    }

})
module.exports = deleteBook




