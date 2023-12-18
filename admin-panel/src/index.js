// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdminPanel from './AdminPanel';

ReactDOM.render(
  <React.StrictMode>
    <AdminPanel />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
