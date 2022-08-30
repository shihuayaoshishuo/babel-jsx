import React from 'react';
import logo from './assets/mt_logo.png';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='background'>
        <img src={logo} className='logo' alt='logo' />
        <p className='text'>Hello MeiTuan again</p>
      </header>
    </div>
  );
}

export default App;
