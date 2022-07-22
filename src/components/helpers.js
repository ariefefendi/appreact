import React from 'react';


const helpers = {

  warning: function(){
    let color = {
      backgroundColor: 'rgba(248, 148, 6, 0.9)',
      color: 'white',
      '&:hover': {
        cursor: 'pointer',
      },
    }
    return color;
  },
  green: function() {
    let color = {
      backgroundColor: 'rgba(63, 195, 128, 0.9)',
      color: 'white',
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
