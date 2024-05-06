import React, { useState } from 'react';

const BookListingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    availability: ''
  });

  const { title, author, genre, condition, availability } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add logic here to send data to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>List a Book for Exchange</h2>
      <label>
        Title:
        <input type="text" name="title" value={title} onChange={handleChange} required />
      </label>
      <label>
        Author:
        <input type="text" name="author" value={author} onChange={handleChange} required />
      </label>
      <label>
        Genre:
        <input type="text" name="genre" value={genre} onChange={handleChange} required />
      </label>
      <label>
        Condition:
        <select name="condition" value={condition} onChange={handleChange} required>
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </label>
      <label>
        Availability:
        <select name="availability" value={availability} onChange={handleChange} required>
          <option value="">Select Availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </label>
      <button type="submit">Submit Book</button>
    </form>
  );
};

export default BookListingForm;