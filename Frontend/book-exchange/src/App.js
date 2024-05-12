import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { Home } from './Home';
import Profile from './Profile'; // Import the Profile component
import BookDetailsPage from './Bookdetails';
import BookGrid from './Booklist';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/book" element={<BookDetailsPage/>} />
      </Routes>
    </div>
    </Router>

  );
}

export default App;
