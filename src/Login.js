// NOTE :
// #5 Fetching data dengan useEffect
// fungsi = hampir sama dengan component
import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";

import {Button, Form, Tab, Tabs} from 'react-bootstrap';
import swal from 'sweetalert';
import { writeStorage, deleteFromStorage, useLocalStorage } from '@rehooks/local-storage';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

// import DataTable from 'react-data-table-component';
import helpers from './components/helpers';
import $ from 'jquery';

import axios from "axios";
axios.defaults.baseURL = 'https://demoappkmi.my.id';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

function App() {
  const [dataModel, setDataModel] = useState([])
  const [processing, modeProcessing] = useState(false)
  const [mode, setMode] = useState('login') // bolean = login || regis

  const [items, setItems] = useState([])
  const [id, setId] = useState("")
  const [token, setToken] = useState("")

  const [title, setTitle] = useState("Silahkan Login terlebih dahulu.")

  const [EMAIL, setEMAIL] = useState("")
  const [PASSWORD, setPASSWORD] = useState("")

  // button mode
  const ButtonMode = () => {
    return (
      (mode == "regis") ?
      <div className="py-2">
      <Button type="button"
      onClick={(key) => login(dataModel)}
      variant="outline-primary mx-2" >Regis now!</Button>
      </div>
      :
      <div className="py-2">
      <Button type="button"
      onClick={(key) => login(dataModel)}
      variant="outline-primary">Submit</Button>
      </div>
    )
  }

  // login function
  const login = async(data) => {
    // check mode update ?
    if (mode == 'login') {

      await axios.post('/api/login',{ EMAIL, PASSWORD } )
      .then(response => {
        // console.log(response)
        if (response.status == 200) {
          // set session data
          let id = response.data.record.id
          let token = response.data.token
          writeStorage('items', setItems(response.data.record) )

          swal('success', 'ok! your login'+id+" token : "+token);
        } else {
          console.log(response.status);
          swal('Error', 'Oops! Something happened. Please try again');
        }
      });
    }
  }


  useLocalStorage('items', items);
  console.log(items.name)

  // custom classies
  const customClassies = () => {
    $(".nav-link").addClass('px-3');
  }

  useEffect(() => {
  }, []);

  // adding initialize
  $(document).ready(function () {
    customClassies();
  })

  return(
    <div className="container MainDiv">
    <div className="row pt-3">
    <h3>{title}</h3>
    <Tabs id="controlled-tab-example" activeKey={mode}
    onSelect={(key) => setMode(key)}
    className="ps-2" >
    <Tab eventKey="login" title="Login" className="px-1 py-2">

        <Form.Group className="mb-3">
        <Form.Label>EMAIL</Form.Label>
        <Form.Control placeholder="EMAIL here" type="text"
        value={ mode == 'login' ? dataModel.EMAIL : EMAIL }
        onChange={(e) => setEMAIL(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password here" type="password"
        value={ mode == 'login' ? dataModel.PASSWORD : PASSWORD }
        onChange={(e) => setPASSWORD(e.target.value)} />
        </Form.Group>
        <ButtonMode />

    </Tab>
    <Tab eventKey="regis" title="Registration" className="px-1 py-2">
    <div className="jumbotron text-left">
    <h4>Form Registration...</h4>
    </div>
    </Tab>
    </Tabs>
    </div>
    </div>
  );

}
export default App;
