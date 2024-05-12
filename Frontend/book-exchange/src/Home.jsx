import React, { useState, useEffect } from 'react';
import './Home.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import BookListingForm from './BookListingForm';
import BookGrid from './Booklist'; // Import BookExchangePlatform component
import { Router } from 'react-router-dom';

export const Home = ({ onViewProfile, onSignOut }) => {
  const [showBookListingForm, setShowBookListingForm] = useState(false); // New state for showing book listing form

  const toggleBookListingForm = () => {
    setShowBookListingForm(!showBookListingForm);
  };

  return (
    <div className="home-container">
      <div className="top-bar">
        <h1 className="title">Home</h1>
        <div className="user-profile">
          <FontAwesomeIcon icon={faUser} size="lg" />
          <button onClick={onViewProfile} className="view-profile-button">View Profile</button>
          <button onClick={onSignOut} className="sign-out-button">Sign Out</button>
        </div>
      </div>
      <div className="search-container">
        <input type="search" className="search-input" placeholder="Type your search query" />
        <button className="search-button">Search</button>
      </div>
      <button onClick={toggleBookListingForm} className="list-book-button">List a Book</button> {/* Button to toggle the book listing form */}
      {showBookListingForm && <BookListingForm />} {/* Conditionally render the book listing form */}
      <BookGrid /> {/* Render the BookExchangePlatform component */}
    </div>
  );
}

export default Home;
