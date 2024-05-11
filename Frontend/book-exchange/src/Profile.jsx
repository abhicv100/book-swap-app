import React from 'react';
import './Profile.css'; // Import CSS file for styling
import { getUserIdFromAccessToken } from "./Util";

export const Profile = () => {

  const userId = getUserIdFromAccessToken()

  // call to get the user details
  

  // Sample user data
  const userData = {
    username: 'Jane Doe',
    favoriteGenre: 'Fiction',
    booksOwned: [
      { title: 'To Kill a Mockingbird', image: './images/book1.jpg', author: 'Harper Lee', condition: 'Good' },
      { title: 'Harry Potter and the Sorcerer\'s Stone', image: './images/book2.jpg', author: 'J.K. Rowling', condition: 'New' },
      { title: 'The Great Gatsby', image: './images/book3.jpg', author: 'F. Scott Fitzgerald', condition: 'Fair' }
    ]
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="user-details">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Favorite Genre:</strong> {userData.favoriteGenre}</p>
      </div>
      <div className="books-owned">
        <h2>Books Owned</h2>
        <div className="book-tiles">
          {userData.booksOwned.map((book, index) => (
            <div key={index} className="book-tile">
              <img src={book.image} alt={book.title} className="book-image" />
              <div className="book-details">
                <p className="book-title">{book.title}</p>
                <p className="book-author"><strong>Author:</strong> {book.author}</p>
                <p className="book-condition"><strong>Condition:</strong> {book.condition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
