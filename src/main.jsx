import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import smoothscroll from 'smoothscroll-polyfill';

// Enable smooth scroll di semua browser
smoothscroll.polyfill();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
