// NOTE :
// #4 Reusable component & Props
import React from 'react'

import CardComponent from '../components/Card'

function App() {
  return (
      <div className="my-3 mx-1">
          <div className="container">
                <div className="row">

                  <div className="col-md-4">

                        <CardComponent
                            recordMaterial={{
                                imageUrl:"http://placekitten.com/300/200",
                                title:"First Post",
                                published:"06 Jun, 2022",
                            }}
                        />

                        <CardComponent
                            recordMaterial={{
                                imageUrl:"http://placekitten.com/300/138",
                                title:"Second Post",
                                published:"07 Jun, 2022",
                            }}
                        />

                        <CardComponent
                            recordMaterial={{
                                imageUrl:"http://placekitten.com/g/300/200",
                                title:"Thrid Post",
                                published:"08 Jun, 2022",
                            }}
                        />

                  </div>

                </div>
          </div>
      </div>
  )
}

export default App
