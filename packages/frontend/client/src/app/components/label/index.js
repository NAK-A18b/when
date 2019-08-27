import React from 'react';

const styles = (props) => ({
  color: props.color ? props.color : props.primary ? '#888585' : '#B5B4B4',
  fontSize: props.big ? '28px' : '18px',
  fontWeight: props.fontWeight,
})

const Label = (props) => 
  <span 
    className={props.className} 
    style={ styles(props) }
  >
    { props.children }
  </span>

export default Label;