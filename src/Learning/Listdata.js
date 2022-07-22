// NOTE :
// #5.1 Fetching data dengan useEffect.
// FILTERED
// fungsi = hampir sama dengan component
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
// import ReactDOM from 'react-dom'


function App() {

  const [user, setUser] = useState([]);

  const getUser = async () => {

    try {

      let res = await Axios.get(`https://jsonplaceholder.typicode.com/users`)
        let user = res.data;

        user.length > "1" ? setUser(user) : setUser([user])

      } catch (e) {
        console.log(e.message);
      }

    }

    // useEffect / ready function.
    useEffect(() => {
      getUser()

    },[])

    return (
      <div className="container my-3" >
      <div className="row justify-content-center">
      <div className="col-md-8">
      <table className="table">
      <thead>
      <tr>
      <th>index</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>Website</th>
      <th>Phone</th>
      </tr>
      </thead>
      <tbody>

      {
        user.map((user, index) => {
          return (
            <tr key={index}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.website}</td>
            <td>{user.phone}</td>
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
