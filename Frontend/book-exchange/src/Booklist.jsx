import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookCard(props) {
  let navigate  = useNavigate();

  const url = '/book/' + props.id
  return (
    <div className="book-tile" onClick={() => {navigate(url)} }>
      <img src={props.book.imageUrl} alt={props.book.title} />
      <div>
        <h2>{props.book.title}</h2>
        <p>{props.book.author}</p>
      </div>
    </div>
  );
}

function BookGrid(props) {
  return (
    <div className="book-grid">
      {props.booksData.map((book, index) => (
        <BookCard key={index} book={book} id={index}/>
      ))}
    </div>
  );
}

export default BookGrid;
