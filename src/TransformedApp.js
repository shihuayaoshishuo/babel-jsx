import React from 'react';
import logo from './assets/mt_logo.png';
import './App.css';

function App() {
  return React.createElement("div", {
    className: 'App'
  }, React.createElement("header", {
    className: 'background'
  }, React.createElement("img", {
    src: logo,
    className: 'logo',
    alt: 'logo'
  }), React.createElement("p", {
    className: 'text'
  }, "Hello MeiTuan")));
}

export default App;