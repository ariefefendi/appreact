import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// component App
import App from './App';
import Listdata from './Learning/Listdata';
import FilterData from './Learning/filteredTable';

// component Learning
import ManagementState from './Learning/ManagementState';
import FormHandler from './Learning/FormHandler';
import StateLess from './Learning/StateLess';
import Cards from './Learning/Cards';
import ExampleData_01 from './Learning/data_dataTables';
import ExampleData_02 from './Learning/data_02_dataTables';
import ExampleData_03 from './Learning/data_03_dataTables';
import Login from './Login';
// import ExampleCreateUpdate from './Learning/ExampleCreateUpdate';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <Login />

  </React.StrictMode>
);

//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
