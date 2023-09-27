

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import API from '../../Axios/Axios';

import 'react-datepicker/dist/react-datepicker.css';
import './BookForm.css';

const BookForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    no_of_pages: '',
    published_at: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!formData.title || !formData.author || !formData.no_of_pages || !formData.published_at) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await API.post('create_book', formData);
      console.log('Book created successfully:', response.data);
      if (props.getData) {
        props.getData();
      }
      setFormData({
        title: '',
        author: '',
        no_of_pages: '',
        published_at: '',
      });
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div>
      <div className='Form-wrapper '>
        <Form>
          <div className='d-flex justify-content-center pt-5'>
            <Row className='mx-0 align-items-center w-25 m-auto '>
              <Col md={12}>
                <Form.Group className='mb-3' controlId='inputid'>
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type='string'
                    placeholder='Enter Book Name'
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className='mb-3' controlId='inputid'>
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    type='string'
                    placeholder='Enter Author Name'
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className='mb-3' controlId='inputid'>
                  <Form.Label>Number of Pages</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Type Number of Pages'
                    value={formData.no_of_pages}
                    onChange={(e) => setFormData({ ...formData, no_of_pages: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className='mb-3' controlId='inputid'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='name@example.com'
                    value={formData.published_at}
                    onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className='mb-3 ' controlId='inputid'>
                  <Form.Control
                    type='submit'
                    onClick={handleSubmit}
                    className='submit-button  shadow-none'
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookForm;
