// NOTE :
// #5.1 Fetching data dengan useEffect.
// FILTERED
// fungsi = hampir sama dengan component
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
// import Cards from './Learning/Cards';


function App() {

  // set model / set State
  const [user, setUser]                     = useState([]);

  const [filterValue, setFilterValue]       = useState('username');
  const [filterText, setFilterText]         = useState('');
  const [modeProcessing, setModeProcessing] = useState(false);
  const [modeMatch, setModeMatch]           = useState(false);

  const [optionsFilter]                     = useState([
    { label: "Id", value: "id"},
    { label: "Name", value: "name"},
    { label: "Username", value: "username"}
  ]);

  // create funtions get data and filtered
  const getUser = async () => {
    setModeProcessing(true)
    try {
      let filtering = ``;
      if ( filterValue != "" && filterText != "" ) { filtering = `${filterValue}=${filterText}` }

      let res   = await Axios.get(`https://jsonplaceholder.typicode.com/users?${filtering}`)
      let user  = res.data;
      setUser(user);

      user.length == 0 ? setModeMatch(true) : setModeMatch(false)

    } catch (e) {
      console.log(e.message);
    }
    setModeProcessing(false)
  }

  // create funtions get Select data
  const getSelectid = async (id) => {
     console.log(id);
  }

// useEffect / ready function. / apply binding
useEffect(() => {
  getUser()
},[ filterValue, filterText ])

  return (

      <div className="container my-3" >

        <div className="row mx-0">

        <div className="col-md-12">

            <div className="input-group">
                <span className="input-group-text">Search</span>
                    <select value={filterValue} onChange={ (e) => setFilterValue(e.target.value) }
                    className="form-select" aria-label="select example" >
                      {
                        optionsFilter.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                      }
                    </select>
                    <input type="text" value={filterText} onChange={ (e) => setFilterText(e.target.value) }
                      aria-label="Filter Text" className="form-control"/>
            </div>

            <table className="table">
                  <thead>
                    <tr>
                    <th>Id</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Website</th>
                      <th>Phone</th>
                      <th colSpan="2">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                     {
                       // check Processing && check matching..
                       modeProcessing ?
                         <tr>
                              <td colSpan="8">Loading..</td>
                         </tr> :
                       modeMatch == true ?
                         <tr>
                              <td colSpan="8">Not found!</td>
                         </tr> :

                         // loop Data Table.
                         user.map((user, index) => {
                                   return (
                                       <tr key={index}>
                                           <td>{user.id}</td>
                                           <td>{user.name}</td>
                                           <td>{user.username}</td>
                                           <td>{user.email}</td>
                                           <td>{user.website}</td>
                                           <td>{user.phone}</td>
                                           <td className="text-center">
                                               <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                                   <div className="btn-group" role="group">
                                                     <button id="btnGroupDrop1" type="button" className="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                                     <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                       <li>
                                                       <a className="dropdown-item"
                                                       value={user.id}
                                                       onChange={ (e) => getSelectid(e.target.value) }
                                                       >Edit</a>
                                                       </li>
                                                       <li><a className="dropdown-item" href="#">Delete</a></li>
                                                     </ul>
                                                   </div>
                                               </div>
                                           </td>
                                       </tr>
                                   )
                         })
                     }
                     </tbody>

            </table>
        </div>
        </div>
      </div>
  )




}

export default App;
