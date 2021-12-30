import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import serviceWorkerReg from './serviceWorkerReg';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorkerReg();