// NOTE :
// #5 Fetching data dengan useEffect
// fungsi = hampir sama dengan component
import React, { useEffect, useState } from 'react';

import {Button, Form, Tab, Tabs} from 'react-bootstrap';
import swal from 'sweetalert';

// import DataTable from 'react-data-table-component';
import helpers from './components/helpers';
import $ from 'jquery';

import axios from "axios";


function App() {
  const [dataModel, setDataModel] = useState([])
  const [processing, modeProcessing] = useState(false)
  const [mode, setMode] = useState('login') // bolean = login || regis
  const [items, setItems] = useState([])

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


    // save and update data
    const login = (data) => {
      // check mode update ?
      if (mode == 'login') {
        // setDataModel(data)

        // const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
        // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        //
        // const REGISTER_URL = '/api/login';
        //
        // const v1 = USER_REGEX.test(EMAIL);
        // const v2 = PWD_REGEX.test(PASSWORD);
        var config = {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json, text-plain, */*",
            "X-Requested-With": "XMLHttpRequest"
          }
        };
        axios.post('https://d4c4-125-166-2-29.ap.ngrok.io/api/login',
        {
          EMAIL,
          PASSWORD
        }, config)
       .then(response => {
          console.log(response.message);
          const res = response.data;
          if (res.success) {
            try {
              localStorage.setItems('items', JSON.stringify(items));

            } catch (e) {
              swal('Error', 'Oops! Something happened. Please try again');
            }
          } else {
            swal('Error', 'Oops! Something happened. Please try again');
          }
        })
        .catch(err => {
          throw ('Error: ', err);
        });


         // swal("This data will be change!", EMAIL+" - "+PASSWORD);
      } else {
        // let data = {
        //   NAMADEPAN:NAMADEPAN,
        //   KEC:KEC,
        //   HP:HP,
        // }
        console.log(data)
      }
    }

    // custom classies
    const customClassies = () => {
      $(".nav-link").addClass('px-3');
    }

    // const setupTitle = (update) => {
    //   if (mode === 'form' && update === true) {
    //     setTitle("List data Pengguna")
    //   }if (mode === 'list' && update === false) {
    //     setTitle("Form Update same data")
    //   }
    // }

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
              <Tab eventKey="login" title="Login">

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
              <Tab eventKey="regis" title="Registration">
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
