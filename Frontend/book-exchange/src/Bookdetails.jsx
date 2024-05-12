import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getUserIdFromAccessToken } from './Util';
import './Bookdetails.css'

export async function loadBookDetails({ params }) {
  return fetch('http://localhost:8080/api/book/' + params.bookId)
    .then((response) => { return response.json() })
}

export function BookDetailsPage() {

  const book = useLoaderData()

  const userId = getUserIdFromAccessToken()

  const [ownerName, setOwnerName] = useState('')

  const [swapBookId, setSwapBookId] = useState(0)

  const handleChange = (e) => {
    setSwapBookId(e.target.value)
  }

  const [currentUserOwnedBooks, setCurrentUserOwnedBooks] = useState([])

  useEffect(() => {
    fetch('http://localhost:8003/user/' + book.contributedBy)
      .then((response) => {
        if (response.status == 200) {
          return response.json()
        } else {
          throw Error(response.status)
        }
      })
      .then((data) => {
        setOwnerName(data['data'].firstName + ' ' + data['data'].lastName)
      })
      .catch((error) => {
        console.log(error)
      })

    const userBooksUrl = 'http://localhost:8080/api/book?userId=' + userId

    // fetch book contributed by the user
    fetch(userBooksUrl, { method: 'GET' })
      .then((response) => {
        if (response.status == 200) {
          return response.json()
        } else {
          throw Error(response.status)
        }
      })
      .then((data) => {
        setCurrentUserOwnedBooks(data)
      })
      .catch((error) => { console.log(error) })
  }, [])

  const handleSwapRequest = () => {

    if (swapBookId == 0) return

    const swapRequest = {
      requestedBookId: book.id,
      swapBookId: swapBookId,
      requestedBy: userId,
      requestedTo: book.contributedBy
    }

    console.log(swapRequest);

    const headers = {
      'Content-Type': 'application/json'
    }

    fetch('http://localhost:8080/api/swapbook', { method: 'POST', body: JSON.stringify(swapRequest), headers: headers })
      .then((resposne) => {
        if (resposne.status == 200) {
          alert('Swap request submitted!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const SwapRequestSection = () => {
    if (userId != book.contributedBy && userId != null) {
      return (
        <>
          <h3>Swap with one of your books:</h3>
          <select name="swap book" value={swapBookId} onChange={handleChange} required>
            <option value="">Select book</option>
            {
              currentUserOwnedBooks.map((book) => {
                return (<option value={book.id}>{book.name}, {book.author}, {book.release_year}</option>)
              })
            }
          </select>
          <button type="button" onClick={handleSwapRequest}>Request swap</button>
        </>
      )
    }
  }

  return (
    <div className='container'>
      <div className='book-details-container'>
        <div className='book-cover-section'>
          <img src={book.image_url} alt={book.name}
            onError={event => {
              event.target.src = "https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png"
              event.onerror = null
            }} />
        </div>

        <div className='book-details-section'>
          <h1>{book.name}</h1>
          <p><b>Author:</b> {book.author}</p>
          <p><b>Year:</b> {book.release_year}</p>
          <p><b>Genre:</b> {book.genre}</p>
          <p><b>Description:</b> {book.description}</p>
          <p><b>Condition:</b>  {book.condition}</p>

          <p><b>Owned by:</b>{ownerName}</p>
          <SwapRequestSection />
        </div>
      </div>
    </div>
  );
}