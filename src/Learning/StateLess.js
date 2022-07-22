// NOTE : 
// 3) StateLess on Form Handling
import React, { useState } from 'react'
// import axios from 'axios'
 
 function StateLess() {
   // body...
   const [firstname, setFirstname] = useState('');
   const [lastname, setLastname] = useState('');
   const [name, setName] = useState('');

   const submitHandler = (e) => {
    e.preventDefault();
    setName(`${firstname} ${lastname}`);
    setFirstname('');
    setLastname('');
   }
   return (
    <div className="p-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
              <div className="card">
                <div className="card-header">Learn Function</div>
                <div className="card-body">

                <form onSubmit={submitHandler}>
                
                  <div className="form-group mb-2">
                    <label className="sr-only">firstname : </label>
                    <input type="text"
                    value={firstname} onChange={(e) =>  setFirstname(e.target.value)}
                    className="form-control" name="firstname" id="firstname" placeholder="Input field"/>
                  </div>


                  <div className="form-group">
                      <label className="sr-only">lastname : </label>
                      <input type="text"
                      value={lastname} onChange={(e) =>  setLastname(e.target.value)}
                      className="form-control" name="lastname" id="lastname" placeholder="Input field"/>
                  </div>
                                  
                  <button type="submit" className="btn btn-primary my-2">Submit</button>

                  <div><h5>My Name is { name ? name : ' ... ' }</h5></div>
                </form>

    


                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    )
 }

export default StateLess