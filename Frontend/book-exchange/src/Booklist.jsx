import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Booklist.css'

export function BookTile(props) {
  let navigate  = useNavigate();

  const url = '/book/' + props.book.id
  return (
    <div className="book-tile" onClick={() => {navigate(url)} }>
      <img src={props.book.image_url} alt={props.book.title} 
        onError={event => {
          event.target.src = "https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png"
          event.onerror = null
        }}/>
      <div>
        <h2>{props.book.name}</h2>
        <p>{props.book.author}</p>
      </div>
    </div>
  );
}

export function BookGrid(props) {
  return (
    <div className="book-grid">
      {props.booksData.map((book, index) => (
        <BookTile key={book.id} book={book}/>
      ))}
    </div>
  );
}
