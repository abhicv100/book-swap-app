import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { booksData } from './Home';

export function loadBookDetails({params}) {
  return booksData[params.bookId]
}

export function BookDetailsPage() {

  const book = useLoaderData()

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