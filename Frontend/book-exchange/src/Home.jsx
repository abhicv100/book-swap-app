import React, { useState, useEffect } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import BookListingForm from './BookListingForm';
import { BookGrid } from './Booklist';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const [showBookListingForm, setShowBookListingForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState('')

  const toggleBookListingForm = () => {
    setShowBookListingForm(!showBookListingForm);
  };

  let navigate = useNavigate()

  const [isUserSignedIn, setUserSignedIn] = useState(false)

  const [books, setBooks] = useState([])

  useEffect(() => {
    // checking if user have signed in by checking the stored access token
    if (localStorage.getItem('access-token') != null) {
      setUserSignedIn(true)
    }

    // fetch all books
    fetch('http://localhost:8080/api/book')
      .then((response) => { return response.json() })
      .then((data) => {
        console.log(data)
        setBooks(data)
      })
  }, [])

  const searchForBooks = () => {
    if (searchQuery.length > 0) {
      console.log('searching for: ' + searchQuery)

      fetch('http://localhost:8080/api/book?search=' + searchQuery)
        .then((response) => { return response.json() })
        .then((data) => {
          setBooks(data)
        })
    } else {
      fetch('http://localhost:8080/api/book')
        .then((response) => { return response.json() })
        .then((data) => {
          setBooks(data)
        })
    }
  }

  const onSignOut = () => {
    localStorage.removeItem('access-token')
    setUserSignedIn(false)
  }

  return (
    <div className="home-container">
      <div className="top-bar">
        <h1 className="title">BookSwap</h1>
        <div className="search-container">
          <input type="search" value={searchQuery} className="search-input" placeholder="Search by title, author, year" onChange={(e) => { setSearchQuery(e.target.value) }} />
          <button className="search-button" onClick={searchForBooks}>Search</button>
        </div>
        {!isUserSignedIn &&
          (<>
            <button onClick={(e) => { navigate('/login') }} className="view-profile-button">Login</button>
          </>)
        }
      </div>

      {isUserSignedIn &&
        <div className="options-bar">
              {/* <FontAwesomeIcon icon={faUser} size="lg" /> */}
            <button onClick={toggleBookListingForm} className="list-book-button">Submit book</button>
            <button onClick={(e) => { navigate('/swaprequest') }} className="view-profile-button">Swap Requests</button>
            <button onClick={(e) => { navigate('/profile') }} className="view-profile-button">Profile</button>
            <button onClick={onSignOut} className="sign-out-button">Sign Out</button>
        </div>
      }
      
      {showBookListingForm && <BookListingForm />}

      <BookGrid booksData={books} />
    </div>
  );
}

export default Home;
