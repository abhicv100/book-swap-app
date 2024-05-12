import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import CSS file for styling
import { getUserIdFromAccessToken } from "./Util";
import { BookGrid } from './Booklist';

export const Profile = () => {

  const [user, setUser] = useState('')

  const userId = getUserIdFromAccessToken()

  const [userContrbutedBooks, setUserContributedBooks] = useState([])

  useEffect(() => {
    if (userId != null) {
      const userDataUrl = 'http://localhost:8003/user/' + userId
      fetch(userDataUrl, { method: 'GET' })
        .then((response) => {
          if (response.status == 200) {
            return response.json()
          } else {
            throw Error(response.status)
          }
        })
        .then((data) => {
          console.log(data)
          setUser(data['data'])
        })
        .catch((error) => { console.log(error) })

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
          setUserContributedBooks(data)
        })
        .catch((error) => { console.log(error) })
    }
  }, [])

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="user-details">
        <p><strong>Username:</strong> {user.firstName + ' ' + user.lastName}</p>
        <p><strong>Emaild:</strong> {user.emailId}</p>
      </div>
      <div className="books-owned">
        <h2>Books Owned</h2>
        <BookGrid booksData={userContrbutedBooks}/>
      </div>
    </div>
  );
}

export default Profile;
