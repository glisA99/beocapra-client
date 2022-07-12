import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { WithAppContext } from './components/withAppContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WithAppContext>
        <App />
      </WithAppContext>
    </BrowserRouter>
  </React.StrictMode>
);