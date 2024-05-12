import React from 'react';
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


function BookTile({ book }) {
  let navigate  = useNavigate();
  return (
    <div className="book-tile" onClick={() => {navigate('/book')} }>
      <img src={book.imageUrl} alt={book.title} />
      <div>
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>Year Published: {book.yearPublished}</p>
        <p>{book.description}</p>
      </div>
    </div>
  );
}

function BookGrid() {
  return (
    <div className="book-grid">
      {booksData.map((book, index) => (
        <BookTile key={index} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
