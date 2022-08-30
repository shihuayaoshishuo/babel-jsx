import React from 'react';
import logo from './assets/mt_logo.png';
import './App.css';

function App() {
  return React.createElement("div", {
    className: 'App'
  }, "\n      ", React.createElement("header", {
    className: 'background'
  }, "\n        ", React.createElement("img", {
    src: logo,
    className: 'logo',
    alt: 'logo'
  }), "\n        ", React.createElement("p", {
    className: 'text'
  }, "Hello MeiTuan again"), "\n      "), "\n    ");
}

export default App;