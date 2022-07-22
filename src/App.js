// NOTE :
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import helpers from './components/helpers';
// Tab fitur.
// react-bootstrap
import {Button, Form, Tab, Tabs} from 'react-bootstrap';
import swal from 'sweetalert';

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
    setDataModelUpdate([]);
    console.log("Processing : "+processing);
    console.log("mode : "+mode+", Mode_update : "+update);

  }

  // function select
  const selectId = (result) => {
    modeProcessing(true);
    setMode('form');
    setUpdate(true);
    setDataModelUpdate(result);
    console.log(result);
    console.log("getdataId : "+result.id);
    console.log("Processing : "+processing);
    console.log("mode : "+mode+", Mode_update : "+update);
    modeProcessing(false);
  }
  // function deleteId
  const deleteId = (result) => {
    modeProcessing(true);
    setMode('list');
    setUpdate(false);

        swal({
          title: "Are you sure?",
          text: "Data "+result.name+" Once deleted!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {


            console.log(result);
            console.log("getdataId : "+result.id);
            console.log("Processing : "+processing);
            console.log("mode : "+mode+", Mode_update : "+update);

            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });




          } else {
            goBack()
            console.log("cancel deleting!");
          }
        });



    modeProcessing(false);
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
      $(".dataTables_filter ").addClass('pb-2');

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

                        <div>
                        <span className="outline-info">{dataModelUpdate.id}</span>

                        <Form.Group className="mb-3">
                          <Form.Label>Name : </Form.Label>
                          <Form.Control placeholder="Name here"
                          value={ update ? dataModelUpdate.name : "" } />
                        </Form.Group>

                         <Form.Group className="mb-3">
                           <Form.Label>Email : </Form.Label>
                           <Form.Control placeholder="Email here"
                           value={ update ? dataModelUpdate.email : "" } />
                         </Form.Group>

                         <Form.Group className="mb-3">
                           <Form.Label>Website : </Form.Label>
                           <Form.Control placeholder="Site Url here"
                           value={ update ? dataModelUpdate.website : "" } />
                         </Form.Group>

                       </div>

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
                          <th>-</th>
                          <th>-</th>
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
                                <td><Button type="button" onClick={(key) => selectId(result)} variant="outline-secondary" className="me-1">Edit</Button>
                                </td>
                                <td>
                                <Button type="button" onClick={(key) => deleteId(result)} variant="outline-danger">Delete</Button>
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
