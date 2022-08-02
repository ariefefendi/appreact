import React from 'react';


const helpers = {
  warning: function(){
    let color = {
      backgroundColor: 'rgb(249 244 185)',
      // color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    }
    return color;
  },
  green: function() {
    let color = {
      backgroundColor: 'rgb(201 251 191 / 90%)',
      // color: 'black',
      '&:hover': {
        cursor: 'pointer',
      },
    }
    return color;
  }
}

export default helpers;

// [
//   { when: row => row.first_name == 'George', style: green },
//   { when: row => row.first_name == 'Eve', style: warning },
//   { when: row => row.first_name == 'Tobias', style: warning }
// ]
