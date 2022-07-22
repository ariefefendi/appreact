import React from 'react';

function Card(props) {
  let R = props.recordMaterial;
  console.log(R.title);
    return (

      <div className="card my-2 mx-0">
          <img src={R.imageUrl} alt="" className="card-img-top"/>
            <div className="card-body">
                <h4>{R.title}</h4>
                <small className="text-muted">Publish at {R.published}</small>
            </div>
      </div>

    )
}
export default Card
