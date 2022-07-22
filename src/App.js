// NOTE :
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom'
// import DataTable from 'react-data-table-component';
// import helpers from './components/helpers';
// Tab fitur.
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// button
import Button from 'react-bootstrap/Button';

//jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

// class App
function App() {

  const [dataModel, setDataModel] = useState([]);
  const [dataModelUpdate, setDataModelUpdate] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [processing, modeProcessing] = useState(false);
  const [mode, setMode] = useState('form');
  const [update, setUpdate] = useState(false);
  // console.log(back);

  // function back
  const goBack = (key) => {
    setMode(key);
    setUpdate(false);
  }

  // function select
  const selectId = (result) => {
    setMode('form');
    setUpdate(true);
    setDataModelUpdate(result);
    console.log(result);
  }
  // button mode Update
  const ButtonMode = () => {
    return (
      (update == true) ?
        <>
        <Button type="button" onClick={(key) => goBack('list')} variant="outline-secondary">Back</Button>
        <Button type="button" variant="outline-primary mx-2">Save</Button>
        <Button type="button" variant="outline-danger">Delete</Button>
         </>
        :
        <Button type="button" variant="outline-primary">Save</Button>
      )
  }

  // function Get Data
  const getdataAll = async page => {
    modeProcessing(true);
    // https://jsonplaceholder.typicode.com/users
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      setDataModel(response.data);
      setTotalRows(response.data.length);
      // debug
      console.log("getdataAll : "+response.status);
      console.log("Processing : "+processing);
      console.log(setMode);

      // add custom class
      $(".tab-content").addClass('px-0');

      //initialize datatable
      $(document).ready(function () {
        setTimeout(function(){
          $('#example').DataTable();
        } ,2000);
      });

      modeProcessing(false);
    };


    useEffect(() => {
      getdataAll(1); // fetch page 1 of users
    }, []);

    return(

      <div className="container MainDiv my-4">
      <div className="row">
          <Tabs id="controlled-tab-example" activeKey={mode}
          onSelect={(key) => setMode(key)}
          className="ps-0 mb-3"
          >
              <Tab eventKey="form" title="Form">
                <div className="jumbotron text-left">
                  <h3>Form add new same data </h3>
                    <div>
                        { <ButtonMode /> }
                        <br/>
                        <span className="outline-info">{dataModelUpdate.id}</span><br/>
                        <span className="outline-info">{dataModelUpdate.email}</span><br/>
                        <span className="outline-info">{dataModelUpdate.website}</span>
                    </div>
                </div>
              </Tab>

              <Tab eventKey="list" title="List">
              <div className="jumbotron text-left">
              <h3>List Data master </h3>
              </div>
                <div className="container px-0">
                    <table id="example" className="table table-hover table-bordered">
                    <thead>
                      <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Action</th>
                      </tr>
                    </thead>
                        <tbody>
                        {processing?"Loading..":
                        dataModel.map((result) => {
                          return (
                            <tr>
                                <td>{result.id}</td>
                                <td>{result.username}</td>
                                <td>{result.email}</td>
                                <td>
                                <><Button type="button" onClick={(key) => selectId(result)} variant="outline-secondary">Edit</Button></>
                                </td>
                            </tr>
                          )
                        })
                      }
                      </tbody>
                  </table>
                </div>

              </Tab>

          </Tabs>
          </div>
      </div>

    );

  }

  export default App;
