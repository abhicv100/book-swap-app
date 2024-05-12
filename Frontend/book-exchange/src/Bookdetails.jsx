import React from 'react';
import {booksData} from './Booklist'


function BookDetailsPage({ match }) {
  // Retrieve the book title from the URL parameters
  let title = "A Clockwork Orange"

  // Find the book details from the booksData array based on the title
  const book = booksData.find(book => book.title === title);

  if (!book) {
    return <div>Book not found</div>;
  }

  // Dummy data for users with books
  const usersWithBooks = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  const handleRequest = (user) => {
    // Handle request logic here
    console.log(`Requesting book for user: ${user.name}`);
  };

  return (
    <div className='book-detail-tile'>
      <h1>{book.title}</h1>
      <img src={book.imageUrl} alt={book.title} />
      <p>Author: {book.author}</p>
      <p>Year Published: {book.yearPublished}</p>
      <p>{book.description}</p>
      <h3>Users with this book:</h3>
      <ul>
        {usersWithBooks.map((user, index) => (
          <li key={index}>
            {user.name} <button onClick={() => handleRequest(user)}>Request</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetailsPage;
