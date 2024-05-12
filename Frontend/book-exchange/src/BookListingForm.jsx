import React, { useState } from 'react';
import { getUserIdFromAccessToken } from './Util';

import './Home.css'

const BookListingForm = () => {

  const userId = getUserIdFromAccessToken()

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    genre: '',
    condition: '',
    release_year: '',
    description: '',
    contributedBy: '',
    image_url: ''
  });

  const { name, author, genre, condition, release_year, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, contributedBy: userId, image_url: 'https://no-image.png' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);

    const headers = {
      'Content-Type': 'application/json'
    }

    fetch('http://localhost:8080/api/book', {method: 'POST', body: JSON.stringify(formData), headers: headers})
      .then((response) => {
        if(response.status == 200) {
          alert('book submitted')          
        }
      })
  };

  return (
    <form className="book-submit-form" onSubmit={handleSubmit}>
      <h2>Submit a book for exchange</h2>

      <div className="book-submit-form-input">
        <label>Title</label>
        <input type="text" id="name" name="name" value={name} onChange={handleChange} required />
      </div>

      <div className="book-submit-form-input">
        <label>Author</label>
        <input type="text" name="author" value={author} onChange={handleChange} required />
      </div>

      <div className="book-submit-form-input">
        <label>Genre</label>
        <input type="text" name="genre" value={genre} onChange={handleChange} required />
      </div>

      <div className="book-submit-form-input">
        <label>Year</label>
        <input type="text" name="release_year" value={release_year} onChange={handleChange} required />
      </div>

      <div className="book-submit-form-input">
        <label>Description</label>
        {/* <input type="text" name="description" value={description} onChange={handleChange} required /> */}
        <textarea name="description" value={description} onChange={handleChange} rows="4" cols="50"></textarea>
      </div>

      <div className="book-submit-form-input">
        <label>Condition</label>
        <select name="condition" value={condition} onChange={handleChange} required>
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </div>

      <button type="submit">Submit Book</button>
    </form>
  );
};

export default BookListingForm;