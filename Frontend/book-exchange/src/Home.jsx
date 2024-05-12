import React, { useState, useEffect } from 'react';
import './Home.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import BookListingForm from './BookListingForm';
import BookGrid from './Booklist'; // Import BookExchangePlatform component
import { Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const booksData = [
  {
    title: "A Clockwork Orange",
    author: "Anthony Burgess",
    genre: "Dystopian",
    yearPublished: 1962,
    description: "A dystopian novel about the extreme culture of violence and the human desire for free will.",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348339306l/227463.jpg",
    link: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348339306l/227463.jpg"
  },
  {
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    genre: "Historical Fiction",
    yearPublished: 2014,
    description: "Description The parallel stories of a blind French girl and a German boy whose paths collide in occupied France during World War II.2",
    imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1451445646l/18143977.jpg",
    link: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1451445646l/18143977.jpg"
  },
  // Add more books here
];

export const Home = () => {
  const [showBookListingForm, setShowBookListingForm] = useState(false); // New state for showing book listing form

  const toggleBookListingForm = () => {
    setShowBookListingForm(!showBookListingForm);
  };

  let navigate = useNavigate()

  const [isUserSignedIn, setUserSignedIn] = useState(false)

  // checking if user have signed in by checking the stored access token
  useEffect(() => {
    if (localStorage.getItem('access-token') != null) {
      setUserSignedIn(true)
    }
  }, [])

  const onSignOut = () => {
    localStorage.removeItem('access-token')
    setUserSignedIn(false)
  }

  return (
    <div className="home-container">
      <div className="top-bar">
        <h1 className="title">Home</h1>
        <div className="user-profile">

          {isUserSignedIn &&
            (<div>
              <FontAwesomeIcon icon={faUser} size="lg" />
              <button onClick={(e) => { navigate('/profile') }} className="view-profile-button">View Profile</button>
              <button onClick={onSignOut} className="sign-out-button">Sign Out</button>
            </div>)
          }

          {!isUserSignedIn &&
            (<div>
              <button onClick={(e) => { navigate('/login') }} className="view-profile-button">Login</button>
            </div>)
          }
        </div>
      </div>
      <div className="search-container">
        <input type="search" className="search-input" placeholder="Type your search query" />
        <button className="search-button">Search</button>
      </div>
      <button onClick={toggleBookListingForm} className="list-book-button">List a Book</button> {/* Button to toggle the book listing form */}
      {showBookListingForm && <BookListingForm />} {/* Conditionally render the book listing form */}
      <BookGrid booksData={booksData}/> {/* Render the BookExchangePlatform component */}
    </div>
  );
}

export default Home;
