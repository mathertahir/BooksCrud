

import React, { useEffect, useState } from 'react';
import "./list.css";
import API from "../../Axios/Axios";
import BookForm from '../BookForm/BookForm';

const List = () => {
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(Array(books.length).fill(false));
  const [editedDates, setEditedDates] = useState(Array(books.length).fill(''));

  const getApiData = async () => {
    try {
      const res = await API.get('get_book');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await API.delete(`delete_book/${bookId}`);
      console.log(`Book with ID ${bookId} deleted successfully`);
      getApiData();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEdit = (index) => {
    const newEditingState = [...isEditing];
    newEditingState[index] = !newEditingState[index];
    setIsEditing(newEditingState);
  };

  const handleInputChange = (e, index, field) => {
    const updatedBooks = [...books];
    updatedBooks[index][field] = e.target.value;
    setBooks(updatedBooks);


    if (field === 'published_at') {
      const updatedDates = [...editedDates];
      updatedDates[index] = e.target.value;
      setEditedDates(updatedDates);
    }
  };

  const handleUpdate = async (bookId, index) => {
    try {
 
      const updatedDate = editedDates[index];

  
      const response = await API.put(`update_book/${bookId}`, {
        ...books[index],
        published_at: updatedDate,
      });

      console.log(`Book with ID ${bookId} updated successfully`, response.data);
      toggleEdit(index);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div>
      <div className='navbar-main'>
        <div class="active main-heading" href="#home">Books Crud Application</div>

        <div className='form-heading'>ADD Book Record</div>
        <div><BookForm  getData={getApiData}/></div>
        <div className='book-heading-wrapper'>
          <h1 className='book-heading'>Books Lists</h1>
        </div>
        <div className='table-wrapper'>
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Pages</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>
                    {isEditing[index] ? (
                      <input
                        type="text"
                        value={book.title}
                        onChange={(e) => handleInputChange(e, index, 'title')}
                        className='custom-input'
                      />
                    ) : (
                      book.title
                    )}
                  </td>
                  <td>
                    {isEditing[index] ? (
                      <input
                        type="text"
                        value={book.author}
                        onChange={(e) => handleInputChange(e, index, 'author')}
                        className='custom-input'
                      />
                    ) : (
                      book.author
                    )}
                  </td>
                  <td>
                    {isEditing[index] ? (
                      <input
                        type="number"
                        value={book.no_of_pages}
                        onChange={(e) => handleInputChange(e, index, 'no_of_pages')}
                        className='custom-input'
                      />
                    ) : (
                      book.no_of_pages
                    )}
                  </td>
                  <td>
                    {isEditing[index] ? (
                      <input
                        type="date"
                        value={editedDates[index]}
                        onChange={(e) => handleInputChange(e, index, 'published_at')}
                        className='custom-input'
                      />
                    ) : (
                      new Date(book.published_at).toLocaleDateString('en-PK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    )}
                  </td>
                  <td>
                    <div className='d-flex justify-content-center'>
                    {isEditing[index] ? (
                        
                        <button onClick={() => handleUpdate(book._id, index)} className='update-button'>Save</button>
                      ) : (
                        <button onClick={() => toggleEdit(index)} className='update-button'>Update</button>
                      )}
                      <button onClick={() => deleteBook(book._id)}  className='delete-button'>Delete</button>
                    </div>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
