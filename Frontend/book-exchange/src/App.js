import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import { Home } from './Home';
import Profile from './Profile'; // Import the Profile component


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={() => setCurrentForm('home')} />
      ) : currentForm === "register" ? (
        <Register onFormSwitch={toggleForm} />
      ) : currentForm === "home" ? (
        <Home onViewProfile={() => setCurrentForm('profile')} /> // Pass onViewProfile prop to Home component
      ) : (
        <Profile />
      )}
    </div>
  );
}

export default App;
