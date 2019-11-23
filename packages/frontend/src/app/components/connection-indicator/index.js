import React from 'react';

import './styles.css';

const ConnectionIndicator = props => {
  let color = '#888585';
  if (props.color) {
    color = props.color;
  }
  const indicationColor = {"--indicator-color": color};

  return (
    <div>
      <div style={indicationColor} className={'circle'}></div>
      <div style={indicationColor} className={'rectangle'}></div>
      <div style={indicationColor} className={'circle'}></div>
    </div>
  )
}


export default ConnectionIndicator;