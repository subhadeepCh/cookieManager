import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('cookieman'));
const init = (params) => {

  root.render(
    <React.StrictMode>
      <App {...params} />
    </React.StrictMode>
  )
}

window.cookieMan = init;
