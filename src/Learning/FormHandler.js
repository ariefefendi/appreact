// NOTE : 
// 2) FormHandler with ( Class ) on Form Handling
import React, { Component } from 'react'
// import axios from 'axios'
 
 class FormHandler extends Component {
 
 constructor(){
    super()
    // enty object. state management
    this.state = {
     recordData: [],
     Mode: false,
     firstname: '',
     lastname: '',
     name: '',
   }
 }

changeHandler = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

submitHandler = (e) => {
  e.preventDefault() 
  this.setState({
    name: `${this.state.firstname} ${this.state.lastname}`
  })

}
   render() {
    // const {record} = this.state.recordData[0]
    // console.log(record)
   return (
    <div className="p-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
              <div className="card">
                <div className="card-header">Learn Function</div>
                <div className="card-body">

                <form onSubmit={this.submitHandler}>
                
                  <div className="form-group mb-2">
                    <label className="sr-only">firstname : </label>
                    <input type="text"
                    value={this.state.firstname} onChange={this.changeHandler}
                    className="form-control" name="firstname" id="firstname" placeholder="Input field"/>
                  </div>


                  <div className="form-group">
                      <label className="sr-only">lastname : </label>
                      <input type="text"
                      value={this.state.lastname} onChange={this.changeHandler}
                      className="form-control" name="lastname" id="lastname" placeholder="Input field"/>
                  </div>
                                  
                  <button type="submit" className="btn btn-primary my-2">Submit</button>

                  <div><h5>My Name is { this.state.name ? this.state.name : ' ... ' }</h5></div>
                </form>

    


                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
 }

export default FormHandler