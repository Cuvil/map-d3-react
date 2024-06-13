import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa el archivo CSS principal
import App from './App';
import { DataProvider } from './context/DataContext';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
