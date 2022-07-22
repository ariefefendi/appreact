import React, { useState } from 'react';

function App(props) {

  const [filterValue, setFilterValue] = useState('');
  const [filterText, setFilterText] = useState('');


    let R = props.recordMaterial;
    return (

      <div className="input-group">
          <span className="input-group-text">Search</span>
          <input type="text" value={R.filterValue}
            onChange={ (e) => setFilterValue(e.target.value) }
            aria-label="Filter Value"
            className="form-control"/>
          <input type="text" value={R.filterText}
            onChange={ (e) => setFilterText(e.target.value) }
            aria-label="Filter Text"
            className="form-control"/>
      </div>

    )
}
export default App;
