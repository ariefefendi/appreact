// NOTE :
// 1) ManagementState  with ( Class )  & Form Handling
import React, { Component } from 'react'
import axios from 'axios'

class ManagementState extends Component {

  constructor(){
    super()
    // enty object. state management
    this.state = {
     recordData: [],
     Mode: false
   }
 }

// function get data user
getUser = async () => {
  let res = await axios.get("https://jsonplaceholder.typicode.com/users/1")
    let data = res.data;

    this.setState({
      recordData: data
    })

  }

// ManagementStately function
componentDidMount() {
  this.getUser()
}

// Render Data
render() {
  // initial recorddata
  const {recordData} = this.state

  return <div>
    <div>Loop Data {recordData.name} </div>
    <div>Loop Data {recordData.username} </div>
    <div>Loop Data {recordData.email} </div>
  </div>

  ;

}


}

export default ManagementState
