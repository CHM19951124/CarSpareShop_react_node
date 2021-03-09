import React from 'react';
const path = require('path');

export default () => {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + '/spinner.gif'}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
